import { Settings } from "../types";
import PricingDialog from "./payments/PricingDialog";

export function PicoBadge({ settings }: { settings: Settings }) {
  return (
    <>
      <div>
        <PricingDialog />
      </div>
      <a
        href="https://screenshot-to-code.canny.io/feature-requests"
        target="_blank"
      >
        <div
          className="fixed z-50 bottom-16 right-5 rounded-md shadow bg-black
         text-white px-4 text-xs py-3 cursor-pointer"
        >
          feature requests
        </div>
      </a>
      {/* {!settings.accessCode && (
        <a href="https://picoapps.xyz?ref=screenshot-to-code" target="_blank">
          <div
            className="fixed z-50 bottom-5 right-5 rounded-md shadow text-black
         bg-white px-4 text-xs py-3 cursor-pointer"
          >
            an open source project by Pico
          </div>
        </a>
      )} */}
      {settings.accessCode && (
        <a href="mailto:support@picoapps.xyz" target="_blank">
          <div
            className="fixed z-50 bottom-5 right-5 rounded-md shadow text-black
         bg-white px-4 text-xs py-3 cursor-pointer"
          >
            email support
          </div>
        </a>
      )}
    </>
  );
}
