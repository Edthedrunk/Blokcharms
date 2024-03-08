"use client";
import { useEffect, useState } from "react";
import StayBundled from "@/components/layout/Bundled";
import { Modal as NextModal, ModalContent, ModalBody } from "@nextui-org/modal";

export default function TOSModal() {
  const [open, setOpen] = useState(false);

  // check for localstorage tos acceptance
  const setTos = () => {
    localStorage.setItem("accepted_tos", new Date().toISOString());
    setOpen(false);
  };

  // toggle modal on first visit
  useEffect(() => {
    const accepted_tos = localStorage.getItem("accepted_tos");
    if (!accepted_tos) {
      setOpen(true);
    }
  }, []);

  return (
    <NextModal
      className="h-full w-full fixed top-0 left-0 bg-black grid place-content-center text-gold p-4"
      isOpen={open}
      placement="center"
      isDismissable={false}
      hideCloseButton={true}
      size={"full"}
    >
      <ModalContent className="">
        <ModalBody
          onClick={setTos}
          className="self-center border justify-center text-center max-w-lg p-4 rounded-lg overflow-y-auto"
        >
          <div className="cursive text-4xl">A Note From The Ed the Drunk</div>
          <div className="basker text-lg">
            By minting this NFT you are purchasing individual links to create a 
            42 link bracelet. You will be able to burn these into Blokchains once
            phase 2 begins.
             WARNING
             This mint is only available on a Universale Profile. 
          </div>
          <StayBundled />
        </ModalBody>
      </ModalContent>
    </NextModal>
  );
}
