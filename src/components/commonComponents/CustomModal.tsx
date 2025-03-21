import React, { useRef } from "react";

type ICustomModalProps = {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
  modalTitle?: string;
  keepFooter?: boolean;
};

const CustomModal = ({
  children,
  onClose = () => {},
  isOpen = false,
  modalTitle = "Modal Title",
  keepFooter = false,
}: ICustomModalProps) => {
  const overlayRef = useRef(null);
  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (overlayRef?.current === e.target) {
      onClose();
    }
  };
  return (
    <div
      id="custom-tailwind-modal"
      data-modal-backdrop="static"
      tabIndex={-1}
      // aria-hidden={`${!isOpen}`}
      className={
        !isOpen
          ? "hidden "
          : "" +
            "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      }
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div className="p-4 w-full max-w-2xl max-h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          {/* Modal header */}
          <div className="bg-slate-600 flex items-center justify-between p-2 md:p-3 border-b rounded-t-md dark:border-gray-600 border-gray-200">
            <h3 className="text-xl font-semibold text-white dark:text-black">
              {modalTitle}
            </h3>
            <button
              type="button"
              className="cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="static-modal"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5 space-y-4">{children}</div>
          {/* Modal footer */}
          {keepFooter && (
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="static-modal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                I accept
              </button>
              <button
                data-modal-hide="static-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Decline
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
