import React, { useState } from "react";
import { useClassServices } from "../../services/useClassServices";
import { Plus } from "react-feather"; // Assuming you're using react-feather for icons

const CreateClassModal = ({ isOpen, onClose, refetchClasses }) => {
  const { createClass } = useClassServices();
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateClass = async (event) => {
    event.preventDefault();
    try {
      await createClass.mutateAsync({ name: className, description: description });
      onClose();
      refetchClasses();
    } catch (error) {
      console.error("Erreur lors de la création de la classe", error);
    }
  };

  return (
    <dialog open={isOpen} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-base-200 shadow-xl">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Créer une nouvelle classe</h2>
          </div>

          <form onSubmit={handleCreateClass} className="space-y-4">
            <div className="form-control">
              <input
                type="text"
                placeholder="Entrez le nom de la classe"
                className="input input-bordered input-secondary w-full"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <textarea
                placeholder="Entrez une description (optionnelle)"
                className="textarea textarea-bordered w-full textarea-primary"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="modal-action flex justify-between items-center">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost text-teal-500 hover:text-teal-600"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="btn btn-primary flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
                disabled={createClass.isLoading}
              >
                {createClass.isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <Plus className="h-5 w-5 mr-2" />
                    Créer
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default CreateClassModal;
