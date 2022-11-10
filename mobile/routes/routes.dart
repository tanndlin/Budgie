import 'package:flutter/material.dart';
import 'package:mobile/screens/LoginPage.dart';
import 'package:mobile/screens/MainPage.dart';

class Routes {
  static const String LOGINPAGE = '/LoginPage';
  static const String MAINPAGE = '/MainPage';
  // routes of pages in the app
  static Map<String, Widget Function(BuildContext)> get getroutes => {
    '/': (context) => const LoginPage(),
    LOGINPAGE: (context) => const LoginPage(),
    MAINPAGE: (context) => const MainPage(),
  };
}