import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:mobile/global.dart' as global;
import 'package:mobile/models/create_profile.dart';
import '../base_client.dart';
import '../models/budget.dart';
import 'package:flutter/services.dart';

String id = global.userId;
String firstName = "";
String lastName = "";
String initials = "";
int expectedIncome = 0;

class AccountManager extends StatefulWidget {
  const AccountManager({super.key});

  @override
  State<AccountManager> createState() => _AccountManagerState();
}

class _AccountManagerState extends State<AccountManager>{

  void getInfo() async {
    id = global.userId;
    var response = await BaseClient().getProfile(id).catchError((err) {
      print("Fail");
    });
    if (response.firstName == null || response.firstName == "") {
      print("Profile doesn't exist");
      // Execute this if GetProfile returns null profile
      var newProfile = CreateProfile(
          userId: id,
          firstName: firstName,
          lastName: lastName,
          expectedIncome: expectedIncome
      );
    } else {
      print("Got Profile");
      print(id);
      print(response);
    }
  }

  final _firstName = TextEditingController();
  final _lastName = TextEditingController();
  final _expectedIncome = TextEditingController();
  int selectedIndex = 4;

  List<String> routes = [
    '/MainPage',
    '/DisplayPage',
    '/AddPage',
    '/CalendarView',
    '/AccountManager'
  ];

  @override
  Widget build(BuildContext context) {
    // List<Widget> widgetOptions = <Widget>[
    //   MainPageNav();
    //
    // ];

    void onTabTapped(index) {
      print(index);
      selectedIndex = index;
      Navigator.pushNamed(context, routes[index]);
    }

    void _logout() async {
      global.userId = "";
      FirebaseAuth.instance.signOut();
      Navigator.pushNamed(context, '/LoginPage');
    }

    String getEmail(String? myString) {
      if (myString == null) {
        return '';
      }
      return myString;
    }

    String email = getEmail(FirebaseAuth.instance.currentUser?.email);

    editProfile(BuildContext context) {
      showDialog(
          context: context,
          builder: (BuildContext dialogContext) {
            return Dialog(
              backgroundColor: const Color(0xFFFAFAFA),
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20.0)),
              child: Container(
                height: 400,
                child: Padding(
                  padding: const EdgeInsets.only(left: 10.0, right: 10.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    // crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Edit Profile',
                        style: TextStyle(
                            fontSize: 35,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF2D4B03)),
                      ),
                      const SizedBox(
                        height: 10.0,
                      ),
                      Form(
                          child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: <Widget>[
                          Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: TextField(
                              controller: _firstName,
                              decoration: InputDecoration(
                                  enabledBorder: OutlineInputBorder(
                                    borderSide: const BorderSide(
                                        width: 2, color: Color(0xFF2D4B03)),
                                    borderRadius: BorderRadius.circular(10.0),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderSide: const BorderSide(
                                        width: 2, color: Color(0xFF000000)),
                                    borderRadius: BorderRadius.circular(10.0),
                                  ),
                                  labelText: 'First Name',
                                  hintText: 'First Name'),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: TextField(
                              controller: _lastName,
                              obscureText: false,
                              decoration: InputDecoration(
                                  enabledBorder: OutlineInputBorder(
                                    borderSide: const BorderSide(
                                        width: 2, color: Color(0xFF2D4B03)),
                                    borderRadius: BorderRadius.circular(10.0),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderSide: const BorderSide(
                                        width: 2, color: Color(0xFF000000)),
                                    borderRadius: BorderRadius.circular(10.0),
                                  ),
                                  labelText: 'Last Name',
                                  hintText: 'Last Name'),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: TextField(
                              keyboardType: TextInputType.number,
                              inputFormatters: <TextInputFormatter>[FilteringTextInputFormatter.digitsOnly],
                              controller: _expectedIncome,
                              obscureText: false,
                              decoration: InputDecoration(
                                  enabledBorder: OutlineInputBorder(
                                    borderSide: const BorderSide(
                                        width: 2, color: Color(0xFF2D4B03)),
                                    borderRadius: BorderRadius.circular(10.0),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderSide: const BorderSide(
                                        width: 2, color: Color(0xFF000000)),
                                    borderRadius: BorderRadius.circular(10.0),
                                  ),
                                  labelText: 'Expected Income',
                                  hintText: 'Expected Income'),
                            ),
                          ),
                        ],
                      )),
                      const SizedBox(
                        height: 10.0,
                      ),
                      Container(
                        alignment: Alignment.center,
                        height: 50,
                        width: 320,
                        decoration: BoxDecoration(
                          color: const Color(0xFF020100),
                          border: Border.all(
                              width: 2, color: const Color(0xFF2D4B03)),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: TextButton(
                          style: ButtonStyle(
                            foregroundColor:
                                MaterialStateProperty.all<Color>(Colors.black),
                          ),
                          onPressed: () {

                            // On Pressed it should just edit profile depending on what's in here
                            setState(() {
                              initials = _firstName.text[0] + _lastName.text[0];
                              firstName = _firstName.text;
                              lastName = _lastName.text;
                              expectedIncome = int.parse(_expectedIncome.text);
                            });
                            initials = _firstName.text[0] + _lastName.text[0];
                            firstName = _firstName.text;
                            lastName = _lastName.text;
                            expectedIncome = int.parse(_expectedIncome.text);
                            Navigator.of(context).pop();
                          },
                          child: const Text(
                            'Finish',
                            style: TextStyle(
                                fontSize: 20,
                                color: Color(0xFFE3E9E7),
                                fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            );
          });
    }

    return Container(
        // BACKGROUND AND APPBAR
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            stops: [0.2, 0.7, 0.9],
            colors: [
              Color(0xFF479CE0),
              Color(0xFF9ECFA2),
              Color(0xFFE7E233),
            ],
          ),
        ),
        child: Scaffold(
          backgroundColor: Colors.transparent,
          appBar: AppBar(
            centerTitle: false,
            title: const Text(
              'Account Details',
              style: TextStyle(
                  fontSize: 35,
                  color: Color(0xFF2D4B03),
                  fontWeight: FontWeight.bold),
            ),
            actions: <Widget>[
              Padding(
                padding: EdgeInsets.only(right: 20.0, bottom: 6.0),
                child: GestureDetector(
                  onTap: () {
                    Navigator.pushNamed(context, '/MainPage');
                  },
                  // child: Icon(Icons.logout, color: Color(0xFF2D4B03), size: 35.0,),
                  child: Image.asset(
                    'assets/images/budgie.png',
                    scale: 0.1,
                  ),
                ),
              )
            ],
            automaticallyImplyLeading: false,
            flexibleSpace: Container(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                    colors: [
                      Color(0xFFb3e5fc),
                      Color(0xFFb3e5fc),
                    ],
                    begin: FractionalOffset(0.0, 0.0),
                    end: FractionalOffset(1.0, 0.0),
                    stops: [0.0, 1.0],
                    tileMode: TileMode.clamp),
              ),
            ),
          ),

          body: SingleChildScrollView(
              child: Column(children: [
            const SizedBox(
              height: 10.0,
            ),
            Padding(
                padding: EdgeInsets.only(left: 5.0, right: 5.0),
                child: Column(children: <Widget>[
                  Container(
                      width: MediaQuery.of(context).size.width,
                      height: 380,
                      decoration: BoxDecoration(
                          color: Color(0xddb3e5fc),
                          borderRadius: BorderRadius.circular(8),
                          boxShadow: [
                            BoxShadow(
                                blurRadius: 8,
                                offset: Offset(0, 15),
                                color: Color(0xffe3e9e7).withOpacity(.5),
                                spreadRadius: -9)
                          ]),
                      child: Padding(
                          padding: const EdgeInsets.only(
                              left: 10.0, top: 30.0, right: 10.0, bottom: 20.0),
                          child: Column(children: <Widget>[
                            Container(
                              height: 200.0,
                              width: 200.0,
                              decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  border: Border.all(color: Colors.black)),
                              child: Center(
                                  child: Text('$initials',
                                      key: ValueKey(initials),
                                      textAlign: TextAlign.center,
                                      style: const TextStyle(
                                          fontWeight: FontWeight.bold,
                                          fontSize: 100,
                                          color: Color(0xFF2D4B03)))),
                            ),
                            SizedBox(height: 30),
                            Container(
                              height: 50.0,
                              width: MediaQuery.of(context).size.width,
                              color: Colors.transparent,
                              child: Center(
                                  child: Text(firstName + " " + lastName,
                                      key: ValueKey(firstName + lastName),
                                      textAlign: TextAlign.center,
                                      style: const TextStyle(
                                          fontSize: 28,
                                          fontWeight: FontWeight.bold,
                                          color: Color(0xFF2D4B03)))),
                            ),
                            Container(
                              height: 25.0,
                              width: MediaQuery.of(context).size.width,
                              color: Colors.transparent,
                              child: Center(
                                  child: Text('$email',
                                      textAlign: TextAlign.center,
                                      style: const TextStyle(
                                          fontSize: 20,
                                          fontWeight: FontWeight.bold,
                                          color: Color(0xFF2D4B03)))),
                            ),
                            Container(
                              height: 25.0,
                              width: MediaQuery.of(context).size.width,
                              color: Colors.transparent,
                              child: Center(
                                  child: Text('Income: \$$expectedIncome',
                                      textAlign: TextAlign.center,
                                      style: const TextStyle(
                                          fontSize: 20,
                                          fontWeight: FontWeight.bold,
                                          color: Color(0xFF2D4B03)))),
                            ),
                          ]))),
                  SizedBox(height: 10),
                  SizedBox(
                    width: MediaQuery.of(context).size.width,
                    height: 70,
                    child: TextButton(
                        style: ButtonStyle(
                            padding: MaterialStateProperty.all<EdgeInsets>(
                                EdgeInsets.all(15)),
                            foregroundColor:
                                MaterialStateProperty.all<Color>(Colors.black),
                            backgroundColor: MaterialStateProperty.all<Color>(
                                Color(0xddb3e5fc)),
                            shape: MaterialStateProperty.all<
                                RoundedRectangleBorder>(RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(8.0),
                            ))),
                        onPressed: () => editProfile(context),
                        child: const Text("Edit Profile",
                            style: TextStyle(fontSize: 20))),
                  ),
                  SizedBox(height: 10),
                  SizedBox(
                    width: MediaQuery.of(context).size.width,
                    height: 70,
                    child: TextButton(
                        style: ButtonStyle(
                            padding: MaterialStateProperty.all<EdgeInsets>(
                                EdgeInsets.all(15)),
                            foregroundColor:
                                MaterialStateProperty.all<Color>(Colors.black),
                            backgroundColor: MaterialStateProperty.all<Color>(
                                Color(0xddb3e5fc)),
                            shape: MaterialStateProperty.all<
                                RoundedRectangleBorder>(RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(8.0),
                            ))),
                        onPressed: () => null,
                        child: const Text("Reset Password",
                            style: TextStyle(fontSize: 20))),
                  ),
                  SizedBox(height: 10),
                  SizedBox(
                    width: MediaQuery.of(context).size.width,
                    height: 70,
                    child: TextButton(
                        style: ButtonStyle(
                            padding: MaterialStateProperty.all<EdgeInsets>(
                                EdgeInsets.all(15)),
                            foregroundColor:
                                MaterialStateProperty.all<Color>(Colors.black),
                            backgroundColor: MaterialStateProperty.all<Color>(
                                Color(0xddb3e5fc)),
                            shape: MaterialStateProperty.all<
                                RoundedRectangleBorder>(RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(8.0),
                            ))),
                        onPressed: () => _logout(),
                        child: const Text("Logout",
                            style: TextStyle(fontSize: 20))),
                  )
                ])),
          ])),
          // BOTTOM NAV
          bottomNavigationBar: BottomNavigationBar(
            elevation: 0,
            selectedItemColor: Color(0xFF2D4B03),
            unselectedItemColor: Colors.black,
            showSelectedLabels: true,
            currentIndex: selectedIndex,
            onTap: onTabTapped,
            items: const [
              BottomNavigationBarItem(
                  icon: Icon(
                    Icons.home,
                    size: 35.0,
                  ),
                  label: 'Home'),
              BottomNavigationBarItem(
                  icon: Icon(Icons.addchart, size: 35.0), label: 'Budget'),
              BottomNavigationBarItem(
                  icon: Icon(Icons.add_circle_outline, size: 35.0),
                  label: 'Bill'),
              BottomNavigationBarItem(
                  icon: Icon(Icons.calendar_month, size: 35.0),
                  label: 'Calendar'),
              BottomNavigationBarItem(
                  icon: Icon(Icons.account_circle, size: 35.0),
                  label: 'Account'),
            ],
          ),
        ));
  }
}
