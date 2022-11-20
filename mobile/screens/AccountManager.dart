import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_functions/cloud_functions.dart';


class AccountManager extends StatefulWidget {
  const AccountManager({super.key});

  @override
  State<AccountManager> createState() => _AccountManagerState();
}

class _AccountManagerState extends State<AccountManager> {
  int selectedIndex = 4;
  List<String> routes = [
    '/MainPage',
    '/Budget',
    '/BillPage',
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
      FirebaseAuth.instance.signOut();
      Navigator.pushNamed(context, '/LoginPage');
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
                              decoration: const BoxDecoration(
                                  color: Colors.black, shape: BoxShape.circle),
                            ),
                            SizedBox(height: 30),
                            Container(
                              height: 50.0,
                              width: MediaQuery.of(context).size.width,
                              color: Colors.transparent,
                              child: const Center(
                                  child: Text("Alan Nguyen",
                                      textAlign: TextAlign.center,
                                      style: TextStyle(
                                          fontSize: 28,
                                          fontWeight: FontWeight.bold,
                                          color: Color(0xFF2D4B03)))),
                            ),
                            Container(
                              height: 50.0,
                              width: MediaQuery.of(context).size.width,
                              color: Colors.transparent,
                              child: const Center(
                                  child: Text("example123@gmail.com",
                                      textAlign: TextAlign.center,
                                      style: TextStyle(
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
                        onPressed: () => null,
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
