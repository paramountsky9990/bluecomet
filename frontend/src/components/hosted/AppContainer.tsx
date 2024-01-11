import { SignUp, useUser } from "@clerk/clerk-react";
import App from "../../App";
import { useEffect, useRef, useState } from "react";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { AlertDialogContent } from "../ui/alert-dialog";
import FullPageSpinner from "../custom-ui/FullPageSpinner";
import { useAuthenticatedFetch } from "./useAuthenticatedFetch";
import { useStore } from "../../store/store";
import AvatarDropdown from "./AvatarDropdown";
import { UserResponse } from "./types";
import { SAAS_BACKEND_URL } from "../../config";

function AppContainer() {
  const [showPopup, setShowPopup] = useState(false);
  const { isSignedIn, isLoaded } = useUser();

  const setSubscriberTier = useStore((state) => state.setSubscriberTier);

  // For fetching user
  const authenticatedFetch = useAuthenticatedFetch();
  const isInitRequestInProgress = useRef(false);

  // If Clerk is loaded and the user is not signed in, show the sign up popup
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      setShowPopup(true);
    }
  }, [isSignedIn, isLoaded]);

  // Get the current user
  useEffect(() => {
    const init = async () => {
      // Make sure there's only one request in progress
      // so that we don't create multiple users
      if (isInitRequestInProgress.current) return;
      isInitRequestInProgress.current = true;

      // TODO: Handle when the user is not signed in
      const user: UserResponse = await authenticatedFetch(
        SAAS_BACKEND_URL + "/users/create",
        "POST"
      );

      if (!user.subscriber_tier) {
        setSubscriberTier("free");
      } else {
        setSubscriberTier(user.subscriber_tier);
      }

      isInitRequestInProgress.current = false;
    };

    init();
  }, []);

  // If Clerk is still loading, show a spinner
  if (!isLoaded) return <FullPageSpinner />;

  return (
    <>
      <App
        navbarComponent={
          <div className="flex justify-end items-center gap-x-2 px-10 mt-0 mb-4">
            <AvatarDropdown />
          </div>
        }
      />
      <AlertDialog open={showPopup}>
        <AlertDialogContent className="flex justify-center">
          <SignUp
            appearance={{
              elements: {
                card: {
                  boxShadow: "none",
                  borderRadius: "0",
                  border: "none",
                  backgroundColor: "transparent",
                },
                footer: {
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                },
                footerAction: {
                  marginBottom: "5px",
                },
              },
              layout: { privacyPageUrl: "https://a.picoapps.xyz/camera-write" },
            }}
          />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default AppContainer;
