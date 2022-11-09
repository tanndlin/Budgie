import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'firebase_options.dart';

/*
* Tasks:
*   Clear Text Fields
*   Main Page needs to look like something
*   Error Displays on the Screen
*   Close form after submitting on success
*   Error in registration pops up
*/

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  //final Future<FirebaseApp> _fbApp = Firebase.initializeApp();

  const MyApp({super.key});
  //root of application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Budget Tracker',
      theme: ThemeData(
        primarySwatch: Colors.deepPurple,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: const LoginPage(title: 'Login Page'),
      // home: FutureBuilder(
      //     future: _fbApp,
      //     builder: (context, snapshot) {
      //       if (snapshot.hasError) {
      //         if (kDebugMode) {
      //           print('You have an error! ${snapshot.error.toString()}');
      //         }
      //         return const Text('Something went wrong!');
      //       } else if (snapshot.hasData) {
      //         return const LoginPage(title: 'Budget Tracker');
      //       } else {
      //         return const Center(child: CircularProgressIndicator(),
      //         );
      //       }
      //     }),
    );
  }
}

class MainPage extends StatelessWidget {
  const MainPage({super.key});

  @override
  Widget build (BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text("Budgie"),
      ),
      body: const Text("Main Page"),
    );
  }
}

class LoginPage extends StatefulWidget {
  const LoginPage({super.key, required this.title});
  final String title;

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

  String email = "";
  String password = "";
  String login_verification = "";

  @override
  void dispose() {
    _controllerEmail.dispose();
    _controllerPass.dispose();
    super.dispose();
  }

  _register(String userEmail, String userPassword) async {
    UserCredential userCredential = await FirebaseAuth.instance.createUserWithEmailAndPassword(
        email: userEmail,
        password: userPassword);
  }

  _login(String email, String password) async {
    try{
      UserCredential userCredential = await FirebaseAuth.instance.signInWithEmailAndPassword(
          email: email,
          password: password);
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
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => const MainPage()),
        );
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
                                  padding: EdgeInsets.all(8.0),
                                  child: Text(
                                      'Sign Up',
                                    style: TextStyle(
                                      fontSize: 32,
                                    )
                                  ),

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

