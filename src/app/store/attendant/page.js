'use client'

import Table from "@/components/Table/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import ActionButtons from "@/components/ui/ActionButton";

export default function Attendant() {
  const editarAluno = (aluno, e) => {
    e.stopPropagation();
    console.log("Editar:", aluno);
  };

  const deletarAluno = (id, e) => {
    e.stopPropagation();
    console.log("Deletar:", id);
  };

  const columns = [
    { headerName: "Nome", field: "name" },
    { headerName: "Email", field: "email" },
    {
      headerName: "Ações",
      field: "actions",
      renderCell: ({ row }) => (
        <ActionButtons
          row={row}
          onEdit={(row, e) => editarAluno(row, e)}
          onDelete={(id, e) => deletarAluno(id, e)}
        />
      ),
    },
  ];

  const data = [
    { name: "João", email: "joao@email.com", id: 1 },
    { name: "Maria", email: "maria@email.com", id: 2 },
    { name: "José", email: "XXXXXXXXXXXXXX", id: 3 },
    { name: "Pedro", email: "XXXXXXXXXXXXXXX", id: 4 },
    { name: "Ana", email: "XXXXXXXXXXXXX", id: 5 },
    { name: "Carlos", email: "XXXXXXXXXXXXXXXX", id: 6 },
    { name: "Mariana", email: "XXXXXXXXXXXXXXXXX", id: 7 },
    { name: "Rafael", email: "XXXXXXXXXXXXXXXX", id: 8 },
    { name: "Sofia", email: "XXXXXXXXXXXXXXX", id: 9 },
    { name: "Lucas", email: "XXXXXXXXXXXXXXX", id: 10 },
    { name: "Juliana", email: "XXXXXXXXXXXXXXXXX", id: 11 },
    { name: "Gustavo", email: "XXXXXXXXXXXXXXXXX", id: 12 },
    { name: "Larissa", email: "XXXXXXXXXXXXXXXXX", id: 13 },
    { name: "Ricardo", email: "XXXXXXXXXXXXXXXXX", id: 14 },
    { name: "Fernanda", email: "XXXXXXXXXXXXXXXXXX", id: 15 },
    { name: "Rodrigo", email: "XXXXXXXXXXXXXXXXX", id: 16 },
    { name: "Camila", email: "XXXXXXXXXXXXXXXX", id: 17 },
    { name: "Felipe", email: "XXXXXXXXXXXXXXXX", id: 18 },
    { name: "Amanda", email: "XXXXXXXXXXXXXXXX", id: 19 },
    { name: "Gabriel", email: "XXXXXXXXXXXXXXXXX", id: 20 },
  ];

  return (
    <Table
      data={data}
      columns={columns}
      setSelectedLine={(row) => console.log("Selecionado:", row)}
    />
  );
}
