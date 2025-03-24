import React, { useState } from "react";
import { useClassServices } from "../../services/useClassServices";

const CreateClassModal = ({isOpen, onClose, refetchClasses}) => {
    const {createClass} = useClassServices();
    const [className, setClassName] = useState("");
    const [description, setDescription] = useState("");

    const handleCreateClass =  async (event) => {
        event.preventDefault();
        try {
          await createClass.mutateAsync({ name: className, description: description });
          onClose(); 
          refetchClasses();
        } catch (error) {
          console.error("Erreur lors de la création de la classe", error);
        }
    }

    return (
    <dialog open={isOpen} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-base-200 shadow-xl">
        <h3 className="font-bold text-2xl mb-4 text-success">Créer une nouvelle classe</h3>
        <form onSubmit={handleCreateClass} className="space-y-4">
          <div className="form-control">
            {/* <label className="label">
              <span className="label-text">Nom de la classe</span>
            </label> */}
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
            {/* <label className="label">
              <span className="label-text">Description</span>
            </label> */}
            <textarea
              placeholder="Entrez une description (optionnelle)"
              className="textarea textarea-bordered w-full textarea-primary"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="modal-action">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={createClass.isLoading}
            >
              {createClass.isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Créer"
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
    );
}

export default CreateClassModal;