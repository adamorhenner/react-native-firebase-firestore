import { db } from "../config/firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

export async function salvarProduto(data){
    try{
        await addDoc(collection(db, 'produtos'), data)
        return 'ok'
    } catch(error){
        console.log('Erro add produto: ', error)
        return 'erro'
    }
}

export async function pegarProdutos(){
    try {
        const querySnapshot = await getDocs(collection(db, "produtos"));
        let produtos = []
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            let produto = {id: doc.id, ...doc.data()}
            produtos.push(produto)
        });
        return produtos
    } catch(error){
        console.log(error)
        return[]
    }
}

export async function atualizarProduto(produtoId, data){
    try {
        const produtoRef = doc(db, "produtos", produtoId);
        await updateDoc(produtoRef, data)
        return 'ok'
    } catch(error){
        console.log(error);
        return 'erro'
    }
}

export async function deletarProduto(produtoId){
    try {
        const produtoRef = doc(db, "produtos", produtoId);
        await deleteDoc(produtoRef)
        return 'ok'
    } catch(error){
        console.log(error);
        return 'erro'
    }
}
