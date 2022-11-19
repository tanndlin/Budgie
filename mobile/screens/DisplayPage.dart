import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

import 'package:mobile/global.dart' as global;
import 'package:percent_indicator/linear_percent_indicator.dart';

import '../base_client.dart';
import '../models/budget.dart';

final String id = global.userId;

class DisplayPage extends StatefulWidget {
  const DisplayPage({super.key});

  @override
  State<DisplayPage> createState() => _DisplayPageState();
}

class _DisplayPageState extends State<DisplayPage> {
  int selectedIndex = 1;
  List<String> routes = ['/MainPage', '/DisplayPage', '/AddPage', '/CalendarView', '/AccountManager'];

  //0 - budgets, 1 - bills, 2 - extras, 3 - clear
  List<bool> isSelected = [false, false, false, false];

  double budgetPercent = 0.8;
  
  List<Budget> getAllBudgets = <Budget>[];

  _showToast(msg, error) => Fluttertoast.showToast(
    msg: msg, fontSize: 18, gravity: ToastGravity.BOTTOM, backgroundColor: error ? Color(0xFFFF0000).withOpacity(.8) :  Colors.green.withOpacity(.9), textColor: Colors.white,);


  @override
  Widget build(BuildContext context) {

    void onTabTapped(index) {
      print(index);
      selectedIndex = index;
      Navigator.pushNamed(context, routes[index]);
    }

    Widget _buildBudgetCard(int index) => Container(
          padding:  EdgeInsets.only(top: 5.0, left: 10.0, right: 10.0, bottom: 5.0),
          width: MediaQuery.of(context).size.width,
          height: 100,
          decoration: BoxDecoration(
              color: Color(0xddb3e5fc),
              borderRadius: BorderRadius.circular(8),
              boxShadow: [ BoxShadow(
                  blurRadius: 8,
                  offset: Offset(0, 15),
                  color: Color(0xffe3e9e7).withOpacity(.5),
                  spreadRadius: -9)]
          ),
          child: Column(
            children: <Widget>[
              //  Text
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: <Widget>[
                  Text("${getAllBudgets[index].name}"),
                  Text("${getAllBudgets[index].categoryId}"),
                  Text("${getAllBudgets[index].startDate}"),
                ],
              ),
              SizedBox(height: 10.0,),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Text("${getAllBudgets[index].actualPrice}"),
                  Text("of"),
                  Text("${getAllBudgets[index].expectedPrice}"),
                ],
              ),
              SizedBox(height: 10.0,),
              LinearPercentIndicator(
                lineHeight: 20.0,
                percent: (getAllBudgets[index].actualPrice/getAllBudgets[index].expectedPrice),
                progressColor: (getAllBudgets[index].actualPrice/getAllBudgets[index].expectedPrice) <= 0.5 ? Colors.green : Colors.redAccent.shade400,
                backgroundColor: Colors.white,
              ),
            ],
          ),
    );

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
              'Budget',
              style: TextStyle(fontSize: 35, color: Color(0xFF2D4B03), fontWeight: FontWeight.bold),
            ),
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
                            // height:  MediaQuery.of(context).size.height,
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
                                        onPressed: (int newIndex) async {
                                          if (newIndex == 0)
                                          {
                                            var response = await BaseClient().getBudgets().catchError((err) {print("Fail");});
                                            if (response == null) {
                                              _showToast("Could not get", true);
                                              print("response null");
                                            }
                                            else {
                                              print("Got budgets");
                                              print(response);
                                              List<Budget> allBudgets = getBudgetsFromJson(response);
                                              for (Budget b in allBudgets) {
                                                print(b);
                                              }

                                              setState(() {
                                                getAllBudgets = allBudgets;
                                              });

                                            }

                                          }
                                          print(newIndex);
                                          setState(()  {
                                            for (int index = 0; index < isSelected.length; index++)
                                            {

                                              if (index == newIndex) {
                                                isSelected[index] = true;
                                              }
                                              else{
                                                isSelected[index] = false;
                                              }
                                            }
                                            print(isSelected);
                                          });

                                        },
                                      ),
                                      // BUDGET FIELDS
                                      Visibility(
                                        // name, category, spent, total
                                          visible: isSelected[0],
                                          child: Column(
                                            // mainAxisSize: MainAxisSize.min,
                                            children: [
                                                ListView.separated(
                                                  physics: NeverScrollableScrollPhysics(),
                                                  scrollDirection: Axis.vertical,
                                                  shrinkWrap: true,
                                                  itemCount: getAllBudgets.length,
                                                  padding: EdgeInsets.symmetric(horizontal: 10.0, vertical: 10.0),
                                                  itemBuilder: (context, index) {
                                                    return _buildBudgetCard(index);
                                                    // return ListTile(
                                                    //     selected:index==0,
                                                    //     selectedTileColor:Colors.green,
                                                    //     title: Padding(padding:EdgeInsets.all(30.0), child:Text('${getAllBudgets[index].name}')),
                                                    //     onTap:() { print('on tapped'); }
                                                    // );
                                                  },
                                                  separatorBuilder: (context, index) => const Divider(),
                                                ),

                                            ],
                                          ),

                                          // child: Padding(
                                          //   padding: EdgeInsets.only(top: 10.0, left: 15.0, right: 15.0, bottom: 10.0),
                                          //   child:
                                          // )

                                      ),
                                      // BILL FIELDS
                                      Visibility(
                                          visible: isSelected[1],
                                          child:  Padding(
                                            padding: EdgeInsets.symmetric(horizontal: 15),
                                            child: Column(
                                              children: [
                                                //  Budget name
                                                SizedBox(height: 20.0),
                                                LinearPercentIndicator(
                                                  lineHeight: 20.0,
                                                  percent: budgetPercent,
                                                  progressColor: budgetPercent <= 0.5 ? Colors.green : Colors.redAccent.shade400,
                                                  backgroundColor: Colors.white,
                                                ),
                                              ],
                                            ),
                                          )
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