'use client'

import { useEffect, useState } from "react"
import Cookies from 'js-cookie'
import ButtonBack from "@/components/buttons/ButtonBack"
import { useRouter } from "next/navigation"
import FadeSwitch from "@/components/ui/FadeSwitch"
import { toast } from "react-toastify"

export default function ModalEditEmpresa() {
  const URL = "http://localhost:3000"
  const router = useRouter()
  const idUserEmpresa = Cookies.get('id')


  const [empresaId, setEmpresaId] = useState("")
  const [formData, setFormData] = useState({
    nome_fantasia: "",
    email: "",
    telefone: "",
    cnpj: "",
    cidade: "",
    endereco: "",
    estado: "",
    cep: ""
  })

  const fetchGetEmpresaByIdUser = async (idUser) => {
    try {
      const response = await fetch(`${URL}/empresa/getUser/${idUser}`)
      const data = await response.json()
      const empresa = data[0]
      setFormData({
        nome_fantasia: empresa.nome_fantasia || "",
        email: empresa.email || "",
        telefone: empresa.telefone || "",
        cnpj: empresa.cnpj || "",
        cidade: empresa.cidade || "",
        endereco: empresa.endereco || "",
        estado: empresa.estado || "",
        cep: empresa.cep || ""
      })
      setEmpresaId(empresa.id)
    } catch (e) {
      console.error(e)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${URL}/empresa/${empresaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome_fantasia: formData.nome_fantasia,
          email: formData.email,
          cnpj: formData.cnpj,
          cidade: formData.cidade,
          endereco: formData.endereco,
          estado: formData.estado,
          telefone: formData.telefone,
          cep: formData.cep,
          empresaId: empresaId,
          UserId: idUserEmpresa
        })
      })
      if (response.ok) {
        toast.success("Dados atualizados!", {position:"top-center"});
        router.back()
      } else {
        alert("Erro ao atualizar empresa.")
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const id = Cookies.get('id')
    fetchGetEmpresaByIdUser(id)
  }, [])

  return (
    <div className="max-w-4xl mx-auto mt-6 mb-6 p-6 bg-white rounded-2xl shadow-md">
      <ButtonBack childreen={"Voltar"} onClick={() => router.back()} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-indigo-800 mb-6">Dados da Empresa</h2>

          <div className="mb-4">
            <label htmlFor="nome_fantasia" className="block font-medium mb-1">Nome fantasia</label>
            <input id="nome_fantasia" name="nome_fantasia" value={formData.nome_fantasia} onChange={handleChange} className="w-full px-4 py-2 border border-gray-400 rounded-md  " />
          </div>

          <div className="mb-4">
            <label htmlFor="cnpj" className="block font-medium mb-1">CNPJ</label>
            <input id="cnpj" name="cnpj" value={formData.cnpj} onChange={handleChange} className="w-full px-4 py-2 border border-gray-400 rounded-md  " />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-400 rounded-md  " />
          </div>

          <div className="mb-4">
            <label htmlFor="telefone" className="block font-medium mb-1">Telefone</label>
            <input id="telefone" type="tel" name="telefone" value={formData.telefone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-400 rounded-md  " />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-indigo-800 mb-6">Endereço</h2>

          <div className="mb-4">
            <label htmlFor="cidade" className="block font-medium mb-1">Cidade</label>
            <input id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} className="w-full px-4 py-2 border border-gray-400 rounded-md  " />
          </div>

          <div className="mb-4">
            <label htmlFor="endereco" className="block font-medium mb-1">Rua</label>
            <input id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} className="w-full px-4 py-2 border border-gray-400 rounded-md" />
          </div>

          <div className="mb-4">
            <label htmlFor="estado" className="block font-medium mb-1">Estado</label>
            <input id="estado" name="estado" value={formData.estado} onChange={handleChange} className="w-full px-4 py-2 border border-gray-400 rounded-md " />
          </div>

          <div className="mb-6">
            <label htmlFor="cep" className="block font-medium mb-1">CEP</label>
            <input id="cep" name="cep" value={formData.cep} onChange={handleChange} className="w-full px-4 py-2 border border-gray-400 rounded-md " />
          </div>

          <div>
            <button type="button" onClick={handleSubmit} className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition">
              Salvar
            </button>
          </div>

        </div>

      </div>

    </div>

  )
}