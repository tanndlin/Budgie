import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:mobile/screens/LoginPage.dart';

import '../base_client.dart';
import '../models/budget.dart';

import 'package:mobile/global.dart' as global;

final String id = global.userId;

class AddPage extends StatefulWidget {
  const AddPage({super.key});

  @override
  State<AddPage> createState() => _AddPageState();
}

class _AddPageState extends State<AddPage> {
  // budget fields
  // FirebaseAuth auth = FirebaseAuth.instance;

  final budgetName = TextEditingController();
  final budgetCategory = TextEditingController();
  final budgetExpected = TextEditingController();
  final budgetActual = TextEditingController();
  final budgetStart = TextEditingController();

  void clearLogSignFields() {
    budgetName.clear();
    budgetCategory.clear();
    budgetExpected.clear();
    budgetActual.clear();
    budgetStart.clear();
  }

  _showToast(msg, error) => Fluttertoast.showToast(
    msg: msg, fontSize: 18, gravity: ToastGravity.BOTTOM, backgroundColor: error ? Color(0xFFFF0000).withOpacity(.8) :  Colors.green.withOpacity(.9), textColor: Colors.white,);


  int selectedIndex = 2;
  List<String> routes = ['/MainPage', '/Budget', '/AddPage', '/CalendarView', '/AccountManager'];

  //0 - budgets, 1 - bills, 2 - extras, 3 - clear
  List<bool> isSelected = [false, false, false, false];

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
        child: Scaffold (
          backgroundColor: Colors.transparent,
          appBar: AppBar(
            centerTitle: false,
            title: const Text(
              'Budgie',
              style: TextStyle(fontSize: 35, color: Color(0xFF2D4B03), fontWeight: FontWeight.bold),
            ),
            actions: <Widget>[
              Padding(
                padding: EdgeInsets.only(right: 20.0, bottom: 6.0),
                child: GestureDetector(
                  onTap: () {
                    Navigator.pushNamed(context, '/MainPage');
                  },
                  // child: Icon(Icons.logout, color: Color(0xFF2D4B03), size: 35.0,),
                  child: Image.asset('assets/images/budgie.png', scale: 0.1,),
                ),)
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
              child: Column(
                children: [
                  const SizedBox(height: 10.0,),
                  // WHOLE PAGE
                  Padding(
                      padding: EdgeInsets.only(left: 5.0, right: 5.0),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          // BUDGET WIDGET
                          Container(
                            width: MediaQuery.of(context).size.width,
                            height:  MediaQuery.of(context).size.height,
                            decoration: BoxDecoration(
                                color: Color(0x55b3e5fc),

                            ),
                            child: Column(
                              // crossAxisAlignment: CrossAxisAlignment.start,
                              // mainAxisAlignment: MainAxisAlignment.center,
                              children: <Widget>[
                                Padding(
                                  padding: EdgeInsets.only(top: 10.0, left: 15.0, right: 15.0, bottom: 10.0),
                                  child:  Column(
                                    children: <Widget>[
                                      const Align(
                                        alignment: Alignment.centerLeft,
                                        child: Text('Add', style: TextStyle(fontSize: 30,  fontWeight: FontWeight.bold, color: Color(0xFF2D4B03)),),
                                      ),
                                      const SizedBox(height: 20.0,),
                                      ToggleButtons(
                                        isSelected: isSelected,
                                        // selectedColor: Colors.white70,
                                        fillColor: Colors.white70,
                                        borderRadius: BorderRadius.circular(8),
                                        // renderBorder: false,
                                        borderColor: Colors.black54,
                                        selectedBorderColor: Colors.black,
                                        splashColor: Colors.transparent,
                                        children: const <Widget>[
                                          Padding(
                                              padding: EdgeInsets.symmetric(horizontal: 12),
                                              child: Text('Budget', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Color(0xFF2D4B03)),),
                                          ),
                                          Padding(
                                            padding: EdgeInsets.symmetric(horizontal: 12),
                                            child: Text('Bill', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Color(0xFF2D4B03)),),
                                          ),
                                          Padding(
                                            padding: EdgeInsets.symmetric(horizontal: 12),
                                            child: Text('Extras', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Color(0xFF2D4B03)),),
                                          ),
                                          Padding(
                                            padding: EdgeInsets.symmetric(horizontal: 12),
                                            child: Text('Clear', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Color(0xFF2D4B03)),),
                                          ),
                                        ],
                                        onPressed: (int newIndex) {
                                          setState(() {
                                            for (int index = 0; index < isSelected.length; index++)
                                            {
                                              print(newIndex);
                                              if (index == newIndex) {
                                                isSelected[index] = true;
                                              }
                                              else{
                                                isSelected[index] = false;
                                              }
                                              print(isSelected);
                                            }
                                          });

                                        },
                                      ),
                                      // BUDGET FIELDS
                                      Visibility(
                                          // name, category, spent, total
                                          visible: isSelected[0],
                                          child: Padding(
                                            padding: EdgeInsets.symmetric(horizontal: 15),
                                            child: Column(
                                              children: [
                                              //  Budget name
                                                SizedBox(height: 20.0),
                                                Padding(
                                                  //padding: const EdgeInsets.only(left:15.0,right: 15.0,top:0,bottom: 0),
                                                  padding: const EdgeInsets.symmetric(vertical: 10),
                                                  child: TextField(
                                                    controller: budgetName,
                                                    decoration: InputDecoration(
                                                        focusColor: const Color(0xFF2D4B03),
                                                        enabledBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF2D4B03)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        focusedBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF000000)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        prefixIcon: const Icon(Icons.list_alt_rounded),
                                                        labelText: 'Budget Name',
                                                        hintText: 'Name'),
                                                  ),
                                                ),
                                                Padding(
                                                  // padding: const EdgeInsets.only(
                                                  //     left: 15.0, right: 15.0, top: 15, bottom: 10.0),
                                                  padding: EdgeInsets.symmetric(vertical: 10),
                                                  child: TextField(
                                                    controller: budgetActual,
                                                    decoration: InputDecoration(
                                                        enabledBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF2D4B03)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        focusedBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF000000)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        prefixIcon: Icon(Icons.currency_exchange_outlined) ,
                                                        labelText: 'Spent Amount',
                                                        hintText: 'Spent'),
                                                  ),
                                                ),
                                                Padding(
                                                  // padding: const EdgeInsets.only(
                                                  //     left: 15.0, right: 15.0, top: 15, bottom: 10.0),
                                                  padding: EdgeInsets.symmetric(vertical: 10),
                                                  child: TextField(
                                                    controller: budgetExpected,
                                                    decoration: InputDecoration(
                                                        enabledBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF2D4B03)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        focusedBorder: OutlineInputBorder(
                                                          borderSide: const BorderSide(width: 2, color: Color(0xFF000000)),
                                                          borderRadius: BorderRadius.circular(50.0),
                                                        ),
                                                        prefixIcon: Icon(Icons.currency_exchange_outlined) ,
                                                        labelText: 'Total Amount',
                                                        hintText: 'Total'),
                                                  ),
                                                ),
                                                const SizedBox(
                                                  height: 20.0,
                                                ),
                                                Container(
                                                  alignment: Alignment.center,
                                                  height: 50,
                                                  width: 180,
                                                  decoration: BoxDecoration(
                                                    color: const Color(0xFF020100), border: Border.all(width: 2, color: const Color(0xFF2D4B03)), borderRadius: BorderRadius.circular(20),
                                                  ),
                                                  child: TextButton(
                                                    style: ButtonStyle(
                                                      foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                                                    ),
                                                    onPressed: () async {
                                                      // ADD BUDGET
                                                      print(id);
                                                      if (budgetName.text == "" || budgetActual.text == "" || budgetExpected.text == "")
                                                      {
                                                          _showToast("Fill fields", true);
                                                      }
                                                      else
                                                      {
                                                        var budget = Budget(
                                                            userId: id,
                                                            name: budgetName.text,
                                                            actualPrice: int.parse(budgetActual.text),
                                                            expectedPrice: int.parse(budgetExpected.text)
                                                        );
                                                        print(budgetToJson(budget));
                                                        var response = await BaseClient().postBudget(budget).catchError((err) {print("Fail");});
                                                        if (response == null) {
                                                          _showToast("Could not add", true);
                                                          print("response null");
                                                        }

                                                        _showToast("Added", false);
                                                        print("success");
                                                      }

                                                      clearLogSignFields();

                                                    },
                                                    child: const Text(
                                                      'Add Budget',
                                                      style: TextStyle(fontSize: 23, color: Color(0xFFE3E9E7), fontWeight: FontWeight.bold),
                                                    ),
                                                  ),
                                                ),
                                              ],
                                            ),
                                          )

                                      ),
                                      // Budget visible
                                      Visibility(
                                        visible: isSelected[1],
                                        child: Text("Add Bill"),
                                      ),
                                      // Budget visible
                                      Visibility(
                                        visible: isSelected[2],
                                        child: Text("Add Extra"),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),

                        ],
                      )
                  ),
                ],
              )
          ),
          // BOTTOM NAV
          bottomNavigationBar: BottomNavigationBar(
            elevation: 0,
            selectedItemColor: Color(0xFF2D4B03),
            unselectedItemColor: Colors.black,
            showSelectedLabels: true,
            currentIndex: selectedIndex,
            onTap: onTabTapped,
            items: const [
              BottomNavigationBarItem(icon: Icon(Icons.home, size: 35.0,), label: 'Home'),
              BottomNavigationBarItem(icon: Icon(Icons.addchart, size: 35.0), label: 'Budget'),
              BottomNavigationBarItem(icon: Icon(Icons.add_circle_outline, size: 35.0), label: 'Bill'),
              BottomNavigationBarItem(icon: Icon(Icons.calendar_month, size: 35.0), label: 'Calendar'),
              BottomNavigationBarItem(icon: Icon(Icons.account_circle, size: 35.0), label: 'Account'),
            ],
          ),
        )
    );
  }
}
