    import React, { useState } from "react";
    import { useClassServices } from "../../services/useClassServices";

    const JoinClassModal = ({isOpen, onClose, refetchClasses}) => {
        const {joinClass} = useClassServices();
        const [codeActivation, setCodeActivation] = useState("");

        const handleJoinClass =  async (event) => {
            event.preventDefault();
            try {
            await joinClass.mutateAsync(codeActivation);
            setCodeActivation(""); 
            onClose(); 
            refetchClasses();
            } catch (error) {
            console.error("Une erreur est survenue", error);
            }
        }

        return (
        <dialog open={isOpen} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 shadow-xl">
            <h3 className="font-bold text-2xl mb-4">Joindre une classe</h3>
            <form onSubmit={handleJoinClass} className="space-y-4">
            <div className="form-control">
                <label className="label">
                <span className="label-text">Code de la Classe</span>
                </label>
                <input
                type="text"
                placeholder="Entrez le nom de la classe"
                className="input input-bordered w-full"
                value={codeActivation}
                onChange={(e) => setCodeActivation(e.target.value)}
                required
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
                className="btn btn-success"
                disabled={joinClass.isLoading}
                >
                {joinClass.isLoading ? (
                    <span className="loading loading-spinner"></span>
                ) : (
                    "Joindre"
                )}
                </button>
            </div>
            </form>
        </div>
        </dialog>
        );
    }

    export default JoinClassModal;