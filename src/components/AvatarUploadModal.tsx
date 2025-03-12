'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ArrowRight, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useStorage } from '@/hooks/storage';
import { useUpdateVendorProfile } from '@/hooks/updateVendorProfile';
import { useToast } from "@/hooks/use-toast";

interface AvatarUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatar: any;
  setAvatar?: any;
  onUpdate?: () => void;
  style?: React.CSSProperties;
}

let preUploadedAvatars = [
  '/pics.png',
  'http://fastbukadelivery.s3-website.af-south-1.amazonaws.com/dev/images/C4bp85sQkmVM7t1ZQnMthf4xMurOsUiHIaNS61Se.png',
  'http://fastbukadelivery.s3-website.af-south-1.amazonaws.com/dev/images/27sfoZiIuoOmvurIFIWHNraZEuJhd6H1Td4vdyxL.jpeg',
];

export function AvatarUploadModal({
  isOpen,
  onClose,
  avatar,
  setAvatar,
  onUpdate,
}: AvatarUploadModalProps) {
  const { all, store } = useStorage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [bucket, setBucket] = useState<[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { update } = useUpdateVendorProfile();
  const [avatars, setAvatars] = useState(preUploadedAvatars);
  const { toast } = useToast();

  const fetchBucket = useCallback(async () => {
    const response = await all();
    if (response.success) {
      setBucket(response.data.storage.data);
    }
  }, [all]);

  useEffect(() => {
    fetchBucket();
  }, [fetchBucket]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type. Allowed: JPEG, PNG, JPG, GIF.');
      return;
    }

    setFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('No file selected');
      return;
    }
    console.log("File: ", file);

    setLoading(true);
    try {
      const response = await store({ file });
      console.log("Store file response: ", response);

      if (response.success) {
        alert('Upload successful');
        const newImageUrl = response.data.url;
        setAvatars(prev => [...prev, newImageUrl]);
        setAvatar(newImageUrl);
        const upload = await updateVendorProfileImage(newImageUrl);
        console.log("Update vendor profile response: ", upload);
        setFile(null);
        setPreview(null);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error('Upload failed', error);
      if (error instanceof Error) {
        alert(`Upload failed: ${error.message}`);
      } else {
        alert('Upload failed: Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateVendorProfileImage = async (avatar: string) => {
    const vendorUuid = localStorage.getItem("VendorUuid");
    console.log("Vendor UUID: ", vendorUuid);
    console.log("Avatar: ", avatar);
    if (!vendorUuid || !avatar) return;
    
    setLoading(true);
    try {
      const response = await update({
        vendor_uuid: vendorUuid as string,
        profile: avatar as string
      });
      console.log("Update vendor profile response: ", response);

      if (response.success) {
        toast({
          title: "Success",
          description: "Image updated! Remember to upload a branded one",
          variant: "success"
        });
        await fetchBucket();
        onClose();
        window.location.reload();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile image",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px] z-[1001] bg-white'>
        <DialogHeader>
          <DialogTitle>Change Vendor Image</DialogTitle>
          <DialogDescription>
            Choose a new image or upload your own
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue='storage' className='w-full'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='storage'>Storage</TabsTrigger>
            <TabsTrigger value='upload'>Upload</TabsTrigger>
          </TabsList>
          <TabsContent value='storage'>
            <ScrollArea className='h-[300px] w-full rounded-md border p-4'>
              <div className='flex flex-wrap gap-4'>
                {avatars.map((img, index) => (
                  <div
                    key={index}
                    className={`relative aspect-square w-16 overflow-hidden rounded-full cursor-pointer ${
                      avatar == img && 'border-green-600 border-2'
                    }`}
                    onClick={async () => {
                      setAvatar(img);
                      await updateVendorProfileImage(img);
                    }}
                  >
                    <Image
                      src={img || '/svg/placeholder.svg'}
                      alt={`Avatar ${index + 1}`}
                      className='object-cover'
                      fill
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value='upload'>
            <div
              className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors
                ${
                  dragActive
                    ? 'border-primary bg-[#0cae65]'
                    : 'border-muted-foreground/25'
                }
                ${preview ? 'pt-4' : 'min-h-[200px]'}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {preview ? (
                <div className='relative aspect-square w-40 overflow-hidden rounded-full'>
                  {loading ? (
                    <>
                      <span className='border-x-2 animate-spin rounded-full'></span>
                    </>
                  ) : (
                    <Image
                      src={preview || '/pics.png'}
                      alt='Avatar preview'
                      className='object-cover'
                      fill
                      priority
                    />
                  )}
                </div>
              ) : (
                <div className='flex flex-col items-center justify-center text-center'>
                  <Upload className='mb-4 h-8 w-8 text-muted-foreground' />
                  <p className='mb-2 text-sm font-medium'>
                    Drag and drop your image here
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    PNG, JPG, or GIF up to 1MB
                  </p>
                </div>
              )}
              <Input
                ref={inputRef}
                type='file'
                accept='image/*'
                onChange={handleChange}
                className='hidden'
              />
            </div>
            <div className='flex gap-4 mt-4'>
              <Button
                onClick={() => inputRef.current?.click()}
                className='flex-1 bg-[#0cae65] text-white hover:bg-[#0cae65]/80 hover:text-dark'
              >
                Choose File
              </Button>
              {preview && !loading && (
                <>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={handleFileUpload}
                    className='text-green-500'
                  >
                    <ArrowRight className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => setPreview(null)}
                    style={{ color: 'red' }}
                    className='hover:text-black'
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
