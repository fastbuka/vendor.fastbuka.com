import Image from 'next/image';
import Link from 'next/link';
import { IoLocationOutline } from 'react-icons/io5';

interface VendorCardProps {
  name: string;
  description: string;
  city: string;
  slug: string;
  profile?: string;
  ratings: number;
  is_online: boolean;
  id: number | string;
}

const VendorCard: React.FC<VendorCardProps> = ({
  name,
  description,
  city,
  slug,
  profile,
  ratings,
  is_online,
  id,
}) => {
  return (
    <div className="w-full max-w-[384px] flex flex-col gap-4">
      <div className="w-full h-52 bg-gray-200 rounded-lg overflow-hidden relative">
        {profile ? (
          <Image
            src={profile}
            alt={name}
            className="w-full h-full object-cover"
            fill
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{name}</h2>
          <div className="flex items-center gap-2">
            <p className="text-sm">{is_online ? 'Open' : 'Closed'}</p>
            <div
              className={`w-3 h-3 rounded-full ${
                is_online ? 'bg-green-500' : 'bg-red-500'
              }`}
            ></div>
          </div>
        </div>

        <p className="text-sm text-gray-600">{description}</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-700">
            <IoLocationOutline />
            <p>{city}</p>
          </div>
          <div className="flex items-center gap-2 text-yellow-500 font-bold">
            ⭐ <span>{ratings.toFixed(1)}</span>
          </div>
        </div>

        <Link href={'dashboard/' + slug} key={id}>
          <button className="w-full h-12 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition">
            Manage Store
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VendorCard;
