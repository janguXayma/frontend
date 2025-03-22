import { useState, useContext } from "react";
import swal from "sweetalert2";
import AuthContext from "../../context/Authcontext";

const ClassManagement = () => {
  const { user } = useContext(AuthContext);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    code_activation: "",
  });

  // Données statiques des classes
  const classes = [
    {
      id: 1,
      name: "Mathématiques Avancées",
      description: "Classe de mathématiques avancées pour les étudiants en ingénierie.",
      code_activation: "1234",
      students: [
        { id: 1, user: { username: "Alice" } },
        { id: 2, user: { username: "Bob" } },
      ],
    },
    {
      id: 2,
      name: "Physique Quantique",
      description: "Cours sur la physique quantique pour les étudiants avancés.",
      code_activation: "5678",
      students: [
        { id: 3, user: { username: "Charlie" } },
        { id: 4, user: { username: "David" } },
      ],
    },
  ];

  // Fonction de création de classe (statique)
  const createClass = () => {
    swal.fire("Classe créée avec succès", "", "success");
    setShowCreateModal(false);
  };

  // Fonction de suppression de classe (statique)
  const deleteClass = (id) => {
    swal.fire("Classe supprimée", "", "success");
  };

  // Fonction de quitter la classe (statique)
  const leaveClass = (id) => {
    swal.fire("Classe quittée", "", "success");
  };

  // Teacher View
  const renderTeacherClass = (classe) => (
    <div key={classe.id} className="card bg-base-200 p-4 shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{classe.name}</h2>
          <p className="text-sm text-gray-500">{classe.description}</p>
          <div className="mt-2">
            <kbd className="kbd kbd-sm">Code: {classe.code_activation}</kbd>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => {
              setFormData(classe);
              setShowCreateModal(true);
            }}
          >
            ✏️
          </button>
          <button
            className="btn btn-sm btn-ghost text-error"
            onClick={() => deleteClass(classe.id)}
          >
            🗑️
          </button>
        </div>
      </div>
      <div className="mt-4">
        <div className="collapse collapse-arrow">
          <input type="checkbox" />
          <div className="collapse-title text-sm font-medium">
            Étudiants inscrits ({classe.students?.length || 0})
          </div>
          <div className="collapse-content">
            <ul className="menu">
              {classe.students?.map((student) => (
                <li key={student.id}>
                  <a>{student.user.username}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // Student View
  const renderStudentClass = (classe) => (
    <div key={classe.id} className="card bg-base-200 p-4 shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{classe.name}</h2>
          <p className="text-sm text-gray-500">{classe.description}</p>
        </div>
        <button
          className="btn btn-sm btn-error"
          onClick={() => leaveClass(classe.id)}
        >
          Quitter
        </button>
      </div>
      <div className="mt-2">
        <kbd className="kbd kbd-sm">Code: {classe.code_activation}</kbd>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {user?.is_teacher ? "Gestion des Classes" : "Mes Classes"}
      </h1>

      {/* Actions Bar */}
      <div className="flex gap-4 my-6">
        {user?.is_teacher ? (
          <button
            className="btn btn-primary"
            onClick={() => {
              setFormData({ name: "", description: "", code_activation: "" });
              setShowCreateModal(true);
            }}
          >
            Créer une Classe
          </button>
        ) : (
          <button
            className="btn btn-secondary"
            onClick={() => setShowJoinModal(true)}
          >
            Rejoindre une Classe
          </button>
        )}
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes?.length > 0 ? (
          classes.map((classe) =>
            user?.is_teacher
              ? renderTeacherClass(classe)
              : renderStudentClass(classe)
          )
        ) : (
          <div className="col-span-full text-center text-gray-500">
            {user?.is_teacher
              ? "Aucune classe créée pour le moment"
              : "Vous n'êtes inscrit à aucune classe"}
          </div>
        )}
      </div>

      {/* Create/Edit Class Modal */}
      {showCreateModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-bold mb-4">
              {formData.id ? "Modifier la Classe" : "Créer une Classe"}
            </h2>
            <div className="space-y-4">
              <input
                className="input input-bordered w-full"
                placeholder="Nom de la classe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <div className="modal-action">
                <button
                  className="btn btn-primary"
                  onClick={createClass}
                >
                  Valider
                </button>
                <button
                  className="btn"
                  onClick={() => setShowCreateModal(false)}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Join Class Modal */}
      {showJoinModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-bold mb-4">Rejoindre une Classe</h2>
            <div className="space-y-4">
              <input
                className="input input-bordered w-full"
                placeholder="Code d'activation"
                value={formData.code_activation}
                onChange={(e) =>
                  setFormData({ ...formData, code_activation: e.target.value })
                }
                maxLength={4}
              />
              <div className="modal-action">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    swal.fire("Vous avez rejoint la classe", "", "success");
                    setShowJoinModal(false);
                  }}
                >
                  Rejoindre
                </button>
                <button
                  className="btn"
                  onClick={() => setShowJoinModal(false)}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassManagement;
