import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  static const String _title = 'Budgie';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: _title,
      home: Scaffold(
        appBar: AppBar(title: const Text(_title)),
        body: const MyStatefulWidget(),
        backgroundColor: Color(0xFFB0F2B4),
      ),
    );
  }
}

class MyStatefulWidget extends StatefulWidget {
  const MyStatefulWidget({Key? key}) : super(key: key);

  @override
  State<MyStatefulWidget> createState() => _MyStatefulWidgetState();
}

class _MyStatefulWidgetState extends State<MyStatefulWidget> {

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.all(10),
        child: ListView(
          children: <Widget>[
            Container(
                alignment: Alignment.center,
                padding: const EdgeInsets.all(10),
                child: const Text(
                  'Budgie!',
                  style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.w500,
                      fontSize: 30),
                )),
            Column(
              children: [
                new Image.asset('assets/images/budgie.jpg'), // <-- SEE HERE
              ],
            ),
            Container(
              padding: const EdgeInsets.all(10),
              child: const TextField(
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Enter Username',
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.fromLTRB(10, 10, 10, 0),
              child: const TextField(
                obscureText: true,
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Enter Password',
                ),
              ),
            ),
            Container(
                padding: const EdgeInsets.fromLTRB(50, 10, 50, 0),
                height: 50,
                child: ElevatedButton(
                  style: OutlinedButton.styleFrom(
                    backgroundColor: Colors.black, //<-- SEE HERE
                  ),
                  onPressed: () {
                  },
                  child: const Text('Login'),
                )
            ),
            Container(
                padding: const EdgeInsets.fromLTRB(50, 10, 50, 0),
                height: 50,
                child: ElevatedButton(
                  style: OutlinedButton.styleFrom(
                    backgroundColor: Colors.black, //<-- SEE HERE
                  ),
                  onPressed: () {
                  },
                  child: const Text('Register'),
                )
            ),
          ],
        ));
  }
}
