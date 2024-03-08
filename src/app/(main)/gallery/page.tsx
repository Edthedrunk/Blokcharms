"use client";
import Link from "next/link";
import { getProfile, getTokens } from "@/actions/contract";
import GridItem from "@/components/layout/GridItem";
import Image from "next/image";
import { useAccount } from "wagmi";
import { SetStateAction, useEffect, useState } from "react";
import ConnectButton from "@/components/ConnectButton";
import { Copy } from "@/utils/icons/copy";
import { toast } from "sonner";

// DropdownItem component for each color option
const DropdownItem = ({ color, image, name, onSelect }) => (
  <a href="#" onClick={() => onSelect(color, image)} className="dropdown-item">
    {name}
  </a>
);

// Square component including the dropdown
const Square = ({ number }) => {
  const [color, setColor] = useState("#FFFFFF"); // Default color
  const [image, setImage] = useState("trans.png"); // Default image

  const handleSelect = (selectedColor: SetStateAction<string>, selectedImage: SetStateAction<string>) => {
    setColor(selectedColor);
    setImage(selectedImage);
    // Additional actions upon color selection
  };

  return (
    <div className="square-container">
      <div className="square" style={{ backgroundColor: color }}>
        <span className="square-number">{number}</span>
        <img src={image} alt="" width={50} height={50} />
      </div>
      <div className="dropdown-menu">
        {/* Each DropdownItem represents a color option */}
        <DropdownItem color="#FFC0CB" image="Pink.png" name="Pink" onSelect={handleSelect} />
        <DropdownItem color="#0000FF" image="Blue.png" name="Blue" onSelect={handleSelect} />
        <DropdownItem color="#00FF00" image="Lime.png" name="Lime" onSelect={handleSelect} />
        <DropdownItem color="#FFA500" image="Orange.png" name="Orange" onSelect={handleSelect} />
        <DropdownItem color="#FF0000" image="Red.png" name="Red" onSelect={handleSelect} />
        <DropdownItem color="#000000" image="Black.png" name="Black" onSelect={handleSelect} />
        <DropdownItem color="#FFFFFF" image="White.png" name="White" onSelect={handleSelect} />
        {/* Continue adding DropdownItem components for other colors */}
      </div>
    </div>
  );
}; 

export default function Page() {
  const { address } = useAccount();
  const [tokens, setTokens] = useState<Token[] | [any]>(Array(12).fill({}));
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    (async () => {
      if (address?.length) {
        const tokenReq = await getTokens(address);
        const profileReq = await getProfile(address);

        let blankTokens;
        if (tokenReq.length < 12) {
          blankTokens = Array(12 - tokenReq.length).fill({});
        } else {
          blankTokens = Array(3 - (tokenReq.length % 3)).fill({});
        }

        setTokens([...tokenReq, ...blankTokens]);
        setProfile(profileReq);
      }
    })();
  }, [address]);

 // Generate squares with dropdowns
 const squares = Array.from({ length: 42 }, (_, i) => <Square key={i} number={i + 1} />);


  const grid = tokens.map((token, i) => (
    <GridItem token={token} key={`grid-item-${i}`} />
  ));

  return (
    <div className="flex gap-3 flex-1 flex-col px-6 w-full max-w-sm h-full">
      {address ? (
        <div className="gold p-[2px] w-full rounded-md">
          <div className="w-full bg-black rounded-md p-3 flex flex-row gap-3 items-center justify-start">
            <div className="aspect-square overflow-hidden rounded-full">
              <div className="gold p-[2px] rounded-full">
                {profile.image ? (
                  <Image
                    src={profile.image}
                    alt={profile.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-[50px] h-[50px]" />
                )}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="digital text-sm text-gold line-clamp-1">
                {profile.name ? profile.name : "Loading..."}
              </div>
              <div className="basker text-gold opacity-60 text-sm line-clamp-1">
                {address.slice(0, 6)}...{address.slice(-6)}
              </div>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://www.hoodiecartel.com/gallery/${address}`
                );
                toast("Share link copied!");
              }}
            >
              <Copy className="text-gold" />
            </button>
          </div>
        </div>
      ) : (
        <ConnectButton />
      )}
      <div className="grid grid-cols-3 gap-3 flex-1 w-full content-start">
        {grid}
      </div>
      <Link
        href="/"
        className="max-h-12 border rounded-md digital text-sm py-3 tracking-widest px-6 w-full text-center text-gold"
      >
        Home
      </Link>
    </div>
    
  );
  
}

