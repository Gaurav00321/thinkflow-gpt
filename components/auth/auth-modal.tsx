"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import AuthForm from "@/components/auth-form";
import { useAuthModal } from "./auth-modal-provider";

export function AuthModal() {
  const { isOpen, closeAuthModal } = useAuthModal();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeAuthModal()}>
      <DialogContent className="sm:max-w-[425px] bg-black/90 border-purple-500/20 backdrop-blur-xl p-0 overflow-hidden">
        <div className="p-6">
            <AuthForm onSuccess={closeAuthModal} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
