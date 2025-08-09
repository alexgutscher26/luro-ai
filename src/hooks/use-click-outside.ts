import { useEffect, useRef } from "react";

/**
 * Custom hook for detecting clicks outside a referenced element
 * 
 * Useful for closing modals, dropdowns, or other overlay components
 * when users click outside of them. Automatically handles event
 * listener setup and cleanup.
 * 
 * @param {() => void} handler - Callback function to execute when outside click is detected
 * 
 * @returns {React.RefObject<HTMLDivElement>} Ref object to attach to the target element
 * 
 * @example
 * // Close dropdown on outside click
 * const DropdownComponent = () => {
 *   const [isOpen, setIsOpen] = useState(false);
 *   const dropdownRef = useClickOutside(() => setIsOpen(false));
 * 
 *   return (
 *     <div ref={dropdownRef}>
 *       {isOpen && (
 *         <div className="dropdown-menu">
 *           Dropdown content
 *         </div>
 *       )}
 *     </div>
 *   );
 * };
 * 
 * // Close modal on outside click
 * const Modal = ({ onClose }) => {
 *   const modalRef = useClickOutside(onClose);
 *   
 *   return (
 *     <div className="modal-overlay">
 *       <div ref={modalRef} className="modal-content">
 *         Modal content
 *       </div>
 *     </div>
 *   );
 * };
 * 
 * @since 1.0.0
 */
export const useClickOutside = (handler: () => void) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handler]);

    return ref;
};
