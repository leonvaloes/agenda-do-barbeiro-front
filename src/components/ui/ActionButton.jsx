'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ActionButtons({ row, onEdit, onDelete }) {
  return (
    <div className="flex justify-center gap-3">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onEdit?.(row, e);
        }}
        className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
      >
        <FontAwesomeIcon icon={faPencilAlt} className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.(row.id, e);
        }}
        className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
      >
        <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
      </button>
    </div>
  );
}
