import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class Budget extends StatefulWidget {
  const Budget({super.key});

  @override
  State<Budget> createState() => _BudgetState();
}

class _BudgetState extends State<Budget> {
  int selectedIndex = 1;
  List<String> routes = ['/MainPage', '/Budget', '/BillPage', '/CalendarView', '/AccountManager'];


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

    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        elevation: 0,
        selectedItemColor: Color(0xFF2D4B03),
        unselectedItemColor: Colors.black,
        showSelectedLabels: true,
        currentIndex: selectedIndex,
        onTap: onTabTapped,
        items: const [
          BottomNavigationBarItem(
              icon: Icon(Icons.home, size: 35.0,), label: 'Home'),
          BottomNavigationBarItem(
              icon: Icon(Icons.addchart, size: 35.0), label: 'Budget'),
          BottomNavigationBarItem(
              icon: Icon(Icons.add_circle_outline, size: 35.0), label: 'Bill'),
          BottomNavigationBarItem(
              icon: Icon(Icons.calendar_month, size: 35.0), label: 'Calendar'),
          BottomNavigationBarItem(
              icon: Icon(Icons.account_circle, size: 35.0), label: 'Account'),
        ],
      ),
    );
  }
}