import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'firebase_options.dart';
import 'package:crypt/crypt.dart';


class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

 @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  FirebaseAuth user_auth = FirebaseAuth.instance;
  final _controllerEmail = TextEditingController();
  final _controllerPass = TextEditingController();
  final _controllerEmail_Reg = TextEditingController();
  final _controllerPass_Reg = TextEditingController();
  final _controllerPass_Confirm = TextEditingController();
  final _controllerFirst_Name = TextEditingController();
  final _controllerLast_Name = TextEditingController();

  String email = "";
  String password = "";
  String login_verification = "";
  String signup_verification = "";

  @override
  void dispose() {
    _controllerEmail.dispose();
    _controllerPass.dispose();
    super.dispose();
  }
  //test123@gmail.com
  //123456
  _register(String userEmail, String userPassword) async {
    String hashedPassword = Crypt.sha256(userPassword, salt: 'abcdefghijklmnop').toString();
    try{
      UserCredential userCredential = await FirebaseAuth.instance.createUserWithEmailAndPassword(
          email: userEmail,
          password: hashedPassword);
      signup_verification = "good";
    } on FirebaseAuthException catch (e) {
      if (e.code == 'email-already-in-use') {
        print('User Already Exists!');
        signup_verification = "bad";
      }
      }
    if(signup_verification == "good")
    {
      _controllerEmail_Reg.clear();
      _controllerPass_Reg.clear();
      _controllerPass_Confirm.clear();
      Navigator.of(context, rootNavigator: true).pop('dialog');
    }
  }

  _login(String email, String password) async {
    String hashedPassword = Crypt.sha256(password, salt: 'abcdefghijklmnop').toString();
    try{
      UserCredential userCredential = await FirebaseAuth.instance.signInWithEmailAndPassword(
          email: email,
          password: hashedPassword);
      login_verification = "good";
    } on FirebaseAuthException catch (e) {
      if (e.code == 'user-not-found') {
        print('No user found with that email!');
        login_verification = "bad";
      } else if (e.code == 'wrong-password') {
        print('Incorrect password!');
        login_verification = "bad";
      }
    }
    if(login_verification == "good")
    {
      Navigator.pushNamed(context, '/MainPage');
    }
  }

  @override
  Widget build(BuildContext context) {
    final formKey = GlobalKey<FormState>();

    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topRight,
          end: Alignment.bottomLeft,
          stops: [0.1, 0.9],
          colors: [
            Colors.lightBlue,
            Colors.green,
          ],
        ),
      ),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        appBar: AppBar(
          title: const Center(child: Text('Budgie')),
          flexibleSpace: Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                  colors: [
                    Colors.lightBlueAccent,
                    Colors.blueAccent,
                  ],
                  begin: FractionalOffset(0.0, 0.0),
                  end: FractionalOffset(1.0, 0.0),
                  stops: [0.0, 1.0],
                  tileMode: TileMode.clamp),
            ),
          ),
        ),
        body: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.only(top: 60.0),
                child: Center(
                  child: SizedBox(
                      width: 200,
                      height: 150,
                      /*decoration: BoxDecoration(
                        color: Colors.red,
                        borderRadius: BorderRadius.circular(50.0)),*/
                      child: Image.asset('assets/images/budgie.png')),
                ),
              ),
              Padding(
                //padding: const EdgeInsets.only(left:15.0,right: 15.0,top:0,bottom: 0),
                padding: const EdgeInsets.symmetric(horizontal: 15),
                child: TextField(
                  controller: _controllerEmail,
                  decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Email',
                      hintText: 'Email'),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(
                    left: 15.0, right: 15.0, top: 15, bottom: 10),
                //padding: EdgeInsets.symmetric(horizontal: 15),
                child: TextField(
                  controller: _controllerPass,
                  obscureText: true,
                  decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Password',
                      hintText: 'Enter secure password'),
                ),
              ),
              Container(
                height: 50,
                width: 250,
                decoration: BoxDecoration(
                  color: Colors.blue, borderRadius: BorderRadius.circular(20),
                ),
                child: TextButton(
                  style: ButtonStyle(
                    foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                  ),
                  onPressed: () {_login(_controllerEmail.text, _controllerPass.text);
                  email = _controllerEmail.text;
                  password = _controllerPass.text;},
                  child: const Text('Submit'),
                ),
              ),
              const SizedBox(
                height: 130,
              ),
              Container(
                height: 50,
                width: 250,
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0), borderRadius: BorderRadius.circular(20),
                ),
                child: TextButton(
                  style: ButtonStyle(
                    foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                  ),
                  onPressed: () {
                    showDialog(
                        context: context,
                        builder: (BuildContext context) {
                          return AlertDialog(
                            content: Stack(
                              children: <Widget>[
                                Positioned(
                                  right: -40.0,
                                  top: -40.0,
                                  child: InkResponse(
                                    onTap: () {
                                      Navigator.of(context).pop();
                                    },
                                    child: const CircleAvatar(
                                      backgroundColor: Colors.red,
                                      child: Icon(Icons.close),
                                    ),
                                  ),
                                ),
                                Form(
                                  key: formKey,
                                  child: Column(
                                    mainAxisSize: MainAxisSize.min,
                                    children: <Widget>[
                                      const Padding(
                                        padding: EdgeInsets.all(2.0),
                                        child: Text(
                                            'Sign Up',
                                            style: TextStyle(
                                              fontSize: 32,
                                            )
                                        ),

                                      ),
                                      Row(
                                          children: <Widget>[
                                          Expanded(
                                            child: TextField(
                                              controller: _controllerFirst_Name,
                                            decoration: const InputDecoration(
                                              border: OutlineInputBorder(),
                                              labelText: 'First Name',
                                            ),
                                                textAlign: TextAlign.left),
                                          ),
                                            Expanded(
                                              child: TextField(
                                                controller: _controllerLast_Name,
                                                  decoration: const InputDecoration(
                                                      border: OutlineInputBorder(),
                                                      labelText: 'Last Name',
                                                  ),
                                                  textAlign: TextAlign.right),
                                            ),
                                      ],
                                      ),
                                      Padding(
                                        padding: const EdgeInsets.all(8.0),
                                        child: TextField(
                                          controller: _controllerEmail_Reg,
                                          decoration: const InputDecoration(
                                              border: OutlineInputBorder(),
                                              labelText: 'Email',
                                              hintText: 'Email'),
                                        ),
                                      ),
                                      Padding(
                                        padding: const EdgeInsets.all(8.0),
                                        child: TextField(
                                          controller: _controllerPass_Reg,
                                          obscureText: true,
                                          decoration: const InputDecoration(
                                              border: OutlineInputBorder(),
                                              labelText: 'Password',
                                              hintText: 'Enter Password'),
                                        ),
                                      ),
                                      Padding(
                                        padding: const EdgeInsets.all(8.0),
                                        child: TextField(
                                          controller: _controllerPass_Confirm,
                                          obscureText: true,
                                          decoration: const InputDecoration(
                                              border: OutlineInputBorder(),
                                              labelText: 'Confirm Password',
                                              hintText: 'Confirm Password'),
                                        ),
                                      ),
                                      Padding(
                                        padding: const EdgeInsets.all(8.0),
                                        child: TextButton(
                                            style: ButtonStyle(
                                                foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                                                backgroundColor: MaterialStateProperty.all<Color>(Colors.blue)
                                            ),
                                            child: const Text("Submit"),
                                            onPressed: () async
                                            {
                                              if(_controllerPass_Reg.text == _controllerPass_Confirm.text)
                                              {
                                                _register(_controllerEmail_Reg.text, _controllerPass_Reg.text);
                                                // _changeName(_controllerFirst_Name.text, _controllerLast_Name.text);
                                              }
                                              else
                                              {
                                                print('Passwords don\'t match!');
                                              }
                                            }
                                        ),
                                      )
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          );
                        });},
                  child: const Text('New User? Sign Up Here!'),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}