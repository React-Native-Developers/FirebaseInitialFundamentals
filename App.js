//ESTE APP ESTA IMPEMENTADO UTILIZANDO REALTIME DATABASE
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import firebase from 'firebase';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {pessoas:''}
  }

  componentWillMount(){
    var config = {
      apiKey: "AIzaSyCmxrFuiu0Wc_XXD5wZJRwAwpxM3tOy3T4",
      authDomain: "firstfirebase-7ceb9.firebaseapp.com",
      databaseURL: "https://firstfirebase-7ceb9.firebaseio.com",
      projectId: "firstfirebase-7ceb9",
      storageBucket: "firstfirebase-7ceb9.appspot.com",
      messagingSenderId: "393586712637"
    };
    firebase.initializeApp(config);
  }

  salvarUsuario(){
    var funcionario = firebase.database().ref("funcionario");
    funcionario.set('300')
    //funcionario.push().child("nome").set('Celestino');
    /*funcionario.push().set(
      {
        nome: 'Celestino',
        idade: '100',
        profissao: 'Professor'
      }
    )*/
  }

  listarUsuario(){
    var funcionario = firebase.database().ref('funcionario');
    funcionario.on('value', (snapshot)=>{
      var pessoasAqui = snapshot.val();
      this.setState({pessoas: pessoasAqui});
    });
  }

  cadastrarUsuario() {
    let email = 'diego@gmail.com';
    let senha = 'abcd1234'

    const usuario = firebase.auth();
    usuario.createUserWithEmailAndPassword(
      email,
      senha
    ).catch(
      (erro)=>{
        let mensagemErro = '';
        if(erro.code === 'auth/weak-password')
        {
          mensagemErro = 'A senha precisa ter no mínimo 6 caracteres'
        }
        //erro.code e erro.message
        alert(mensagemErro);
      }
    );
  }

  verificarUsuarioLogado(){
    let usuario = firebase.auth();
    
    /* //Verificar usuário logado método 2 (Mais Recomendado)
    let usuarioAtual = usuario.currentUser;
    if (usuarioAtual)
    {
      alert('Usuário está logado');
    } else {
      alert('Usuário não logado');
    }*/

    usuario.onAuthStateChanged(
      (usuarioAtual) => {
        if (usuarioAtual)
        {
          alert('Usuário está logado');
        } else {
          alert('Usuário não logado');
        }
      }
    );
  }

  deslogarUsuario() {
    let usuario = firebase.auth();
    usuario.signOut();
  }

  logarUsuario() {    
    let email = 'diego@gmail.com';
    let senha = 'abcd1234'

    const usuario = firebase.auth();
    usuario.signInWithEmailAndPassword(
      email,
      senha
    ).catch(
      (erro)=>{
        let mensagemErro = '';
        if(erro.code === 'auth/wrong-password')
        {
          mensagemErro = 'Senha incorreta'
        }
        //erro.code e erro.message
        alert(mensagemErro);
      }
    );
  }

  render() {
    let {pessoas} = this.state;
    return (
      <View>
        <Button 
          onPress={()=>{this.salvarUsuario();}}
          title = 'Adcionar!'
          color = '#841584'
          sensibilityLabel = 'Testar App'
        />

        <Button 
          onPress={()=>{this.listarUsuario();}}
          title = 'Listar!'
          color = '#841584'
          sensibilityLabel = 'Testar App'
        />
        <Text>{pessoas}</Text>

        <Button 
          onPress={()=>{this.cadastrarUsuario();}}
          title = 'Cadastrar usuario!'
          color = '#841584'
          sensibilityLabel = 'Testar App'
        />

        <Button 
          onPress={()=>{this.verificarUsuarioLogado();}}
          title = 'Verificar Usuário!'
          color = '#841584'
          sensibilityLabel = 'Testar App'
        />

        <Button 
          onPress={()=>{this.deslogarUsuario();}}
          title = 'Deslogar Usuário!'
          color = '#841584'
          sensibilityLabel = 'Testar App'
        />

        <Button 
          onPress={()=>{this.logarUsuario();}}
          title = 'Logar Usuário!'
          color = '#841584'
          sensibilityLabel = 'Testar App'
        />

        <Text>{pessoas}</Text>
      </View>
    );
  }
}