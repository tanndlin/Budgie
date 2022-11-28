import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:intl/intl.dart';

import 'package:mobile/global.dart' as global;
import 'package:percent_indicator/linear_percent_indicator.dart';

import '../base_client.dart';
import '../models/budget.dart';
import '../models/myCategory.dart';
import '../models/myExtra.dart';

String id = global.userId;

class DisplayPage extends StatefulWidget {
  const DisplayPage({super.key});

  @override
  State<DisplayPage> createState() => _DisplayPageState();
}

class _DisplayPageState extends State<DisplayPage> {
  late var budgetName = TextEditingController();
  late var budgetCategory = TextEditingController();
  late var budgetExpected = TextEditingController();
  late var budgetActual = TextEditingController();
  late var budgetStart = TextEditingController();

  late var extraName = TextEditingController();
  late var extraPrice = TextEditingController();
  late var extraDate = TextEditingController();

  final categoryAdd = TextEditingController();

  int selectedIndex = 1;
  List<String> routes = ['/MainPage', '/DisplayPage', '/AddPage', '/CalendarView', '/AccountManager'];

  //0 - budgets, 1 - bills, 2 - extras, 3 - clear
  List<bool> isSelected = [false, false, false, false];


  List<Budget> getAllBudgets = <Budget>[];
  List<MyExtra> getAllExtras = <MyExtra>[];

  _showToast(msg, error) => Fluttertoast.showToast(
    msg: msg, fontSize: 18, gravity: ToastGravity.BOTTOM, backgroundColor: error ? Color(0xFFFF0000).withOpacity(.8) :  Colors.green.withOpacity(.9), textColor: Colors.white,);

  List<MyCategory> getAllCategories = <MyCategory>[];
  MyCategory? categoryValue;

  Future<void> getAllBud()
  async {
    id = global.userId;
    // getAllBudgets = <Budget>[];

    var response = await BaseClient().getBudgets(id).catchError((err) {print("Fail");});
    if (response == null) {
      _showToast("Could not get", true);
      print("response null");
    }
    else {
      print("Got budgets");
      print(id);
      print(response);
      List<Budget> allBudgets = getBudgetsFromJson(response);
      for (Budget b in allBudgets) {
        print(b.name);
      }

      if (allBudgets.length == 0)
      {
        _showToast("No budgets", true);
      }
      setState(() {
        getAllBudgets = allBudgets;
      });

    }
  }

  Future<void> getAllCat()
  async {
    id = global.userId;
    // getAllCategories = <MyCategory>[];

    var response = await BaseClient().getCategories(id).catchError((err) {print("Fail");});
    if (response == null) {
      _showToast("Could not get", true);
      print("response null");
    }
    else {
      print("Got Categories");
      print(id);
      print(response);
      List<MyCategory> allCategories = getCategoriesFromJson(response);
      for (MyCategory c in allCategories) {
        print(c.name);
      }

      if (allCategories.length == 0)
      {
        _showToast("No Categories", true);
      }
      // var addVal = MyCategory(name: "Add New");
      // allCategories.add(addVal);
      setState(() {
        getAllCategories = allCategories;
      });

    }
  }

  Future<void> getAllExt()
  async {
    id = global.userId;

    var response = await BaseClient().getExtras(id).catchError((err) {print("Fail");});
    if (response == null) {
      _showToast("Could not get", true);
      print("response null");
    }
    else {
      print("Got Extras");
      print(id);
      print(response);
      List<MyExtra> allExtras = getExtrasFromJson(response);

      if (allExtras.length == 0)
      {
        _showToast("No budgets", true);
      }
      setState(() {
        getAllExtras = allExtras;
      });

      for (MyExtra e in getAllExtras)
      {
          print(e.name);
      }
    }
  }

  Future<void> deleteBudget(int index)
  async {
    id = global.userId;
    String? budgetId = getAllBudgets[index].id;
    print("Remove");
    print(getAllBudgets[index].name);
    var response = await BaseClient().deleteBudget(id, budgetId).catchError((err) {print("Fail");});
    if (response == null) {
      _showToast("Could not remove", true);
      print("response null");
    }
    else {
      print("success");
      _showToast("Deleted", false);
      getAllBud();
      getAllCat();
    }
  }

  Future<void> deleteExtra(int index)
  async {
    id = global.userId;
    String? extraId = getAllExtras[index].id;
    print("Remove");
    print(getAllExtras[index].name);
    var response = await BaseClient().deleteExtra(id, extraId).catchError((err) {print("Fail");});
    if (response == null) {
      _showToast("Could not remove", true);
      print("response null");
    }
    else {
      print("success");
      _showToast("Deleted", false);
      getAllExt();
      getAllCat();
    }
  }

  @override
  void initState() {
    super.initState();
    getAllCat();
  }

  @override
  Widget build(BuildContext context) {

    void onTabTapped(index) {
      print(index);
      selectedIndex = index;
      Navigator.pushNamed(context, routes[index]);
    }

    void showAddCategory(BuildContext context){
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return Dialog(
              backgroundColor: const Color(0xFFFAFAFA),
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20.0)),
              child: Container(
                height: 200,
                child: Padding(
                  padding: const EdgeInsets.only(left: 10.0, right: 10.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    // crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Add Category', style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold, color: Color(0xFF2D4B03)),),
                      const SizedBox( height: 10.0,),
                      TextField(
                        controller: categoryAdd,
                        decoration: InputDecoration(
                            enabledBorder: OutlineInputBorder(
                              borderSide: const BorderSide(width: 2, color: Color(0xFF2D4B03)),
                              borderRadius: BorderRadius.circular(10.0),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderSide: const BorderSide(width: 2, color: Color(0xFF000000)),
                              borderRadius: BorderRadius.circular(10.0),
                            ),
                            prefixIcon: const Icon(Icons.list_outlined),
                            labelText: 'Name',
                            hintText: 'Name'),
                      ),
                      const SizedBox( height: 10.0,),
                      Container(
                        alignment: Alignment.center,
                        height: 40,
                        width: 320,
                        decoration: BoxDecoration(
                          color: const Color(0xFF020100), border: Border.all(width: 2, color: const Color(0xFF2D4B03)), borderRadius: BorderRadius.circular(10),
                        ),
                        child: TextButton(
                          style: ButtonStyle(
                            foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                          ),
                          onPressed: () async {
                            //  Add category
                            id = global.userId;
                            var cat = MyCategory(
                              userId: id,
                              name: categoryAdd.text,
                            );
                            print("Json");
                            print(myCategoryToJson(cat));
                            var response = await BaseClient().postCategory(cat).catchError((err) {print("Fail");});
                            if (response == null) {
                              _showToast("Could not get", true);
                              print("response null");
                            }
                            else {
                              print("Add Category");
                              print(id);
                              print(response);
                            }

                            getAllCat();
                            Navigator.pop(context, true);
                          },
                          child: const Text(
                            'Add',
                            style: TextStyle(fontSize: 20, color: Color(0xFFE3E9E7), fontWeight: FontWeight.bold),
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

    void showBudgetEditDialog(int index, BuildContext context){
      setState(() {
        budgetName.text = getAllBudgets[index].name;
        budgetActual.text = getAllBudgets[index].actualPrice.toString();
        budgetExpected.text = getAllBudgets[index].expectedPrice.toString();

        if (getAllBudgets[index].justDate() != "-1")
        {
          // _budgetStartDate = DateTime.parse(getAllBudgets[index].justDate());
          budgetStart.text = getAllBudgets[index].justDate();
        }

        if (getAllBudgets[index].categoryId != "-1")
        {
          categoryValue = getCategory(getAllCategories, getAllBudgets[index].categoryId);
        }
      });

      showDialog(
          context: context,
          builder: (BuildContext context) {
            return Dialog(
              backgroundColor: const Color(0xFFFAFAFA),
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20.0)),
              child: Container(
                height: 400,
                child: Padding(
                  padding: const EdgeInsets.only(left: 10.0, right: 10.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    // crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox( height: 10.0,),
                      const Text('Edit Budget', style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold, color: Color(0xFF2D4B03)),),
                      const SizedBox( height: 10.0,),
                      Padding(
                        padding: EdgeInsets.symmetric(vertical: 5),
                        child: TextField(
                          controller: budgetName,
                          decoration: InputDecoration(
                              contentPadding: EdgeInsets.symmetric(vertical: 0),
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
                        padding: EdgeInsets.symmetric(vertical: 5),
                        child: TextField(
                          controller: budgetActual,
                          decoration: InputDecoration(
                              contentPadding: EdgeInsets.symmetric(vertical: 0),
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
                        padding: EdgeInsets.symmetric(vertical: 5),
                        child: TextField(
                          controller: budgetExpected,
                          decoration: InputDecoration(
                              contentPadding: EdgeInsets.symmetric(vertical: 0),
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
                      Padding(
                        padding: EdgeInsets.symmetric(vertical: 5),
                        child: TextField(
                          controller: budgetStart,
                          decoration: InputDecoration(
                              contentPadding: EdgeInsets.symmetric(vertical: 0),
                              enabledBorder: OutlineInputBorder(
                                borderSide: const BorderSide(width: 2, color: Color(0xFF2D4B03)),
                                borderRadius: BorderRadius.circular(50.0),
                              ),
                              focusedBorder: OutlineInputBorder(
                                borderSide: const BorderSide(width: 2, color: Color(0xFF000000)),
                                borderRadius: BorderRadius.circular(50.0),
                              ),
                              prefixIcon: Icon(Icons.calendar_month) ,
                              labelText: 'Start Date',
                              hintText: 'Start'),
                          readOnly: true,
                          onTap: () async {
                            DateTime? pickedDate = await showDatePicker(
                                context: context,
                                initialDate: DateTime.parse(budgetStart.text),
                                firstDate: DateTime(1900),
                                lastDate: DateTime(2222)
                            );
                            if (pickedDate != null)
                              {
                                String formatDate = DateFormat("MM-dd-yyyy").format(pickedDate);
                                setState(() {
                                  budgetStart.text = formatDate;
                                });
                              }
                            },
                        ),
                      ),
                      Padding(padding: EdgeInsets.symmetric(vertical: 4)),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          Container(
                            width: 220.0,
                            height: 52,
                            child: DropdownButtonFormField(
                              // alignment: Alignment.center,
                              decoration: InputDecoration(
                                contentPadding: EdgeInsets.symmetric(vertical: 0, horizontal: 4),
                                focusColor: const Color(0xFF2D4B03),
                                enabledBorder: OutlineInputBorder(
                                  borderSide: const BorderSide(width: 2, color: Color(0xFF2D4B03)),
                                  borderRadius: BorderRadius.circular(50.0),
                                ),
                                focusedBorder: OutlineInputBorder(
                                  borderSide: const BorderSide(width: 2, color: Color(0xFF000000)),
                                  borderRadius: BorderRadius.circular(50.0),
                                ),
                                prefixIcon: Icon(Icons.list),
                              ),
                              isDense: false,
                              // isExpanded: true,
                              iconSize: 24,
                              hint: Text('Choose Category'),
                              borderRadius: BorderRadius.circular(8),
                              dropdownColor: Color(0xFFE3E9E7),
                              style: TextStyle(color: Color(0xFF000000), fontSize: 16),
                              items: getAllCategories.map((item) {
                                return DropdownMenuItem<MyCategory>(
                                  child: Text(item.name),
                                  value: item,
                                );
                              }).toList(),
                              onChanged: (newVal) {
                                if (newVal != null)
                                {
                                  setState(() {
                                    categoryValue = newVal as MyCategory?;
                                  });
                                }
                                print(categoryValue?.name);
                              },
                              value: categoryValue,
                            ),
                          ),
                          IconButton(
                            style: ButtonStyle(
                              foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                            ),
                            onPressed: ()  {
                              showAddCategory(context);
                            },
                            icon: Icon(Icons.add_circle),
                            iconSize: 40,
                            constraints: BoxConstraints(),
                            padding: EdgeInsets.zero,
                          ),
                        ],
                      ),
                      const SizedBox( height: 8.0,),
                      Container(
                        alignment: Alignment.center,
                        height: 40,
                        width: 320,
                        decoration: BoxDecoration(
                          color: const Color(0xFF020100), border: Border.all(width: 2, color: const Color(0xFF2D4B03)), borderRadius: BorderRadius.circular(10),
                        ),
                        child: TextButton(
                          style: ButtonStyle(
                            foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                          ),
                          onPressed: () async {
                            //  Add category
                            id = global.userId;
                            print(id);
                            if (budgetName.text == "" || budgetActual.text == "" || budgetExpected.text == "")
                            {
                              _showToast("Fill fields", true);
                            }
                            else
                            {
                              var budget = Budget(
                                userId: id,
                                id: getAllBudgets[index].id,
                                name: budgetName.text,
                                actualPrice: num.parse(budgetActual.text),
                                expectedPrice: num.parse(budgetExpected.text),
                                categoryId: categoryValue?.id,
                                startDate: budgetStart.text,
                              );
                              print("EDIT:::::");
                              print(budgetToJsonEdit(budget));
                              var response = await BaseClient().editBudget(budget).catchError((err) {print("Fail");});
                              if (response == null) {
                                _showToast("Could not edit budget", true);
                                print("response null");
                              }

                              _showToast("Edited", false);
                              print("success");
                            }

                            getAllCat();
                            getAllBud();
                            Navigator.pop(context, true);
                          },
                          child: const Text(
                            'Edit',
                            style: TextStyle(fontSize: 20, color: Color(0xFFE3E9E7), fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                      const SizedBox( height: 10.0,),
                    ],
                  ),
                ),
              ),
            );
          });
    }

    void showBudgetDeleteDialog(int index, BuildContext context)
    {
      String deleteName = getAllBudgets[index].name;

      showDialog(
          context: context,
          builder: (BuildContext context) {
            return Dialog(
              backgroundColor: const Color(0xFFFAFAFA),
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20.0)),
              child: Container(
                height: 150,
                child: Padding(
                  padding: const EdgeInsets.only(left: 10.0, right: 10.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    // crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox( height: 10.0,),
                      Text('Are you sure to delete?', style: TextStyle(fontSize: 19, fontWeight: FontWeight.bold, color: Color(0xFFFF0000)),),
                      Text('\"${deleteName}\"', style: TextStyle(fontSize: 19, fontWeight: FontWeight.bold, color: Color(0xFFFF0000)),),
                      const SizedBox( height: 10.0,),
                      Padding(
                        padding: EdgeInsets.only(left: 10, right: 10),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                          Container(
                          alignment: Alignment.center,
                          height: 40,
                          width: 60,
                          decoration: BoxDecoration(
                            color: const Color(0xFF00FF00), border: Border.all(width: 2, color: const Color(0xFF000000)), borderRadius: BorderRadius.circular(10),
                          ),
                          child: TextButton(
                              style: ButtonStyle(
                                foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                              ),
                              onPressed: () async {
                                Navigator.pop(context, true);
                              },
                              child: const Text(
                                'No',
                                style: TextStyle(fontSize: 20, color: Color(0xFF000000), fontWeight: FontWeight.bold),
                              ),
                            ),
                          ),
                        Container(
                          alignment: Alignment.center,
                          height: 40,
                          width: 60,
                          decoration: BoxDecoration(
                            color: const Color(0xFFFF0000), border: Border.all(width: 2, color: const Color(0xFF000000)), borderRadius: BorderRadius.circular(10),
                          ),
                          child: TextButton(
                              style: ButtonStyle(
                                foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                              ),
                              onPressed: () async {
                                deleteBudget(index);
                                Navigator.pop(context, true);
                              },
                              child: const Text(
                                'Yes',
                                style: TextStyle(fontSize: 20, color: Color(0xFF000000), fontWeight: FontWeight.bold),
                              ),
                            ),
                        ),
                          ],
                        ),
                      ),

                     const SizedBox(height: 10.0),
                    ],
                  ),
                ),
              ),
            );
          });
    }

    void showExtraEditDialog(int index, BuildContext context)
    {
      setState(() {
        extraName.text = getAllExtras[index].name;
        extraPrice.text = getAllExtras[index].price.toString();
        extraDate.text = getAllExtras[index].date;

        categoryValue = getCategory(getAllCategories, getAllExtras[index].categoryId);

      });

      showDialog(
          context: context,
          builder: (BuildContext context) {
            return Dialog(
              backgroundColor: const Color(0xFFFAFAFA),
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20.0)),
              child: Container(
                height: 400,
                child: Padding(
                  padding: const EdgeInsets.only(left: 10.0, right: 10.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    // crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox(height: 10.0,),
                      const Text('Edit Extra', style: TextStyle(fontSize: 25,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF2D4B03)),),
                      const SizedBox(height: 10.0,),
                      Padding(
                        padding: EdgeInsets.symmetric(vertical: 5),
                        child: TextField(
                          controller: extraName,
                          decoration: InputDecoration(
                              contentPadding: EdgeInsets.symmetric(vertical: 0),
                              focusColor: const Color(0xFF2D4B03),
                              enabledBorder: OutlineInputBorder(
                                borderSide: const BorderSide(
                                    width: 2, color: Color(0xFF2D4B03)),
                                borderRadius: BorderRadius.circular(50.0),
                              ),
                              focusedBorder: OutlineInputBorder(
                                borderSide: const BorderSide(
                                    width: 2, color: Color(0xFF000000)),
                                borderRadius: BorderRadius.circular(50.0),
                              ),
                              prefixIcon: const Icon(Icons.list_alt_rounded),
                              labelText: 'Extra Name',
                              hintText: 'Name'),
                        ),
                      ),
                      Padding(
                        // padding: const EdgeInsets.only(
                        //     left: 15.0, right: 15.0, top: 15, bottom: 10.0),
                        padding: EdgeInsets.symmetric(vertical: 5),
                        child: TextField(
                          controller: extraPrice,
                          decoration: InputDecoration(
                              contentPadding: EdgeInsets.symmetric(vertical: 0),
                              enabledBorder: OutlineInputBorder(
                                borderSide: const BorderSide(
                                    width: 2, color: Color(0xFF2D4B03)),
                                borderRadius: BorderRadius.circular(50.0),
                              ),
                              focusedBorder: OutlineInputBorder(
                                borderSide: const BorderSide(
                                    width: 2, color: Color(0xFF000000)),
                                borderRadius: BorderRadius.circular(50.0),
                              ),
                              prefixIcon: Icon(
                                  Icons.currency_exchange_outlined),
                              labelText: 'Price Amount',
                              hintText: 'Price'),
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.symmetric(vertical: 5),
                        child: TextField(
                          controller: extraDate,
                          decoration: InputDecoration(
                              contentPadding: EdgeInsets.symmetric(vertical: 0),
                              enabledBorder: OutlineInputBorder(
                                borderSide: const BorderSide(
                                    width: 2, color: Color(0xFF2D4B03)),
                                borderRadius: BorderRadius.circular(50.0),
                              ),
                              focusedBorder: OutlineInputBorder(
                                borderSide: const BorderSide(
                                    width: 2, color: Color(0xFF000000)),
                                borderRadius: BorderRadius.circular(50.0),
                              ),
                              prefixIcon: Icon(Icons.calendar_month),
                              labelText: 'Date',
                              hintText: 'Date'),
                          readOnly: true,
                          onTap: () async {
                            DateTime? pickedDate = await showDatePicker(
                                context: context,
                                initialDate: DateTime.parse(extraDate.text),
                                firstDate: DateTime(1900),
                                lastDate: DateTime(2222)
                            );
                            if (pickedDate != null) {
                              String formatDate = DateFormat("MM-dd-yyyy")
                                  .format(pickedDate);
                              setState(() {
                                extraDate.text = formatDate;
                              });
                            }
                          },
                        ),
                      ),
                      Padding(padding: EdgeInsets.symmetric(vertical: 4)),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          Container(
                            width: 220.0,
                            height: 52,
                            child: DropdownButtonFormField(
                              // alignment: Alignment.center,
                              decoration: InputDecoration(
                                contentPadding: EdgeInsets.symmetric(
                                    vertical: 0, horizontal: 4),
                                focusColor: const Color(0xFF2D4B03),
                                enabledBorder: OutlineInputBorder(
                                  borderSide: const BorderSide(
                                      width: 2, color: Color(0xFF2D4B03)),
                                  borderRadius: BorderRadius.circular(50.0),
                                ),
                                focusedBorder: OutlineInputBorder(
                                  borderSide: const BorderSide(
                                      width: 2, color: Color(0xFF000000)),
                                  borderRadius: BorderRadius.circular(50.0),
                                ),
                                prefixIcon: Icon(Icons.list),
                              ),
                              isDense: false,
                              // isExpanded: true,
                              iconSize: 24,
                              hint: Text('Choose Category'),
                              borderRadius: BorderRadius.circular(8),
                              dropdownColor: Color(0xFFE3E9E7),
                              style: TextStyle(
                                  color: Color(0xFF000000), fontSize: 16),
                              items: getAllCategories.map((item) {
                                return DropdownMenuItem<MyCategory>(
                                  child: Text(item.name),
                                  value: item,
                                );
                              }).toList(),
                              onChanged: (newVal) {
                                if (newVal != null) {
                                  setState(() {
                                    categoryValue = newVal as MyCategory?;
                                  });
                                }
                                print(categoryValue?.name);
                              },
                              value: categoryValue,
                            ),
                          ),
                          IconButton(
                            style: ButtonStyle(
                              foregroundColor: MaterialStateProperty.all<Color>(
                                  Colors.black),
                            ),
                            onPressed: () {
                              showAddCategory(context);
                            },
                            icon: Icon(Icons.add_circle),
                            iconSize: 40,
                            constraints: BoxConstraints(),
                            padding: EdgeInsets.zero,
                          ),
                        ],
                      ),
                      const SizedBox(height: 8.0,),
                      Container(
                        alignment: Alignment.center,
                        height: 40,
                        width: 320,
                        decoration: BoxDecoration(
                          color: const Color(0xFF020100),
                          border: Border.all(width: 2, color: const Color(
                              0xFF2D4B03)),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: TextButton(
                          style: ButtonStyle(
                            foregroundColor: MaterialStateProperty.all<Color>(
                                Colors.black),
                          ),
                          onPressed: () async {
                            //  Add category
                            id = global.userId;
                            print(id);
                            if (extraDate.text == "" ||
                                extraName.text == "" ||
                                extraPrice.text == "") {
                              _showToast("Fill fields", true);
                            }
                            else {
                              var extra = MyExtra(
                                userId: id,
                                id: getAllExtras[index].id,
                                name: extraName.text,
                                price: num.parse(extraPrice.text),
                                categoryId: categoryValue?.id,
                                date: extraDate.text,
                              );
                              print("EDIT:::::");
                              print(myExtraToJson(extra));
                              var response = await BaseClient().editExtra(extra).catchError((err) {
                                print("Fail");
                              });
                              if (response == null) {
                                _showToast("Could not edit extra", true);
                                print("response null");
                              }

                              _showToast("Edited", false);
                              print("success");
                            }

                            getAllCat();
                            getAllExt();
                            Navigator.pop(context, true);
                          },
                          child: const Text(
                            'Edit',
                            style: TextStyle(fontSize: 20,
                                color: Color(0xFFE3E9E7),
                                fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                      const SizedBox(height: 10.0,),
                    ],
                  ),
                ),
              ),
            );
          });
    }

    void showExtraDeleteDialog(int index, BuildContext context)
    {
      String deleteName = getAllExtras[index].name;

      showDialog(
          context: context,
          builder: (BuildContext context) {
            return Dialog(
              backgroundColor: const Color(0xFFFAFAFA),
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20.0)),
              child: Container(
                height: 150,
                child: Padding(
                  padding: const EdgeInsets.only(left: 10.0, right: 10.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    // crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox( height: 10.0,),
                      Text('Are you sure to delete?', style: TextStyle(fontSize: 19, fontWeight: FontWeight.bold, color: Color(0xFFFF0000)),),
                      Text('\"${deleteName}\"', style: TextStyle(fontSize: 19, fontWeight: FontWeight.bold, color: Color(0xFFFF0000)),),
                      const SizedBox( height: 10.0,),
                      Padding(
                        padding: EdgeInsets.only(left: 10, right: 10),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Container(
                              alignment: Alignment.center,
                              height: 40,
                              width: 60,
                              decoration: BoxDecoration(
                                color: const Color(0xFF00FF00), border: Border.all(width: 2, color: const Color(0xFF000000)), borderRadius: BorderRadius.circular(10),
                              ),
                              child: TextButton(
                                style: ButtonStyle(
                                  foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                                ),
                                onPressed: () async {
                                  Navigator.pop(context, true);
                                },
                                child: const Text(
                                  'No',
                                  style: TextStyle(fontSize: 20, color: Color(0xFF000000), fontWeight: FontWeight.bold),
                                ),
                              ),
                            ),
                            Container(
                              alignment: Alignment.center,
                              height: 40,
                              width: 60,
                              decoration: BoxDecoration(
                                color: const Color(0xFFFF0000), border: Border.all(width: 2, color: const Color(0xFF000000)), borderRadius: BorderRadius.circular(10),
                              ),
                              child: TextButton(
                                style: ButtonStyle(
                                  foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                                ),
                                onPressed: () async {
                                  deleteExtra(index);
                                  Navigator.pop(context, true);
                                },
                                child: const Text(
                                  'Yes',
                                  style: TextStyle(fontSize: 20, color: Color(0xFF000000), fontWeight: FontWeight.bold),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 10.0),
                    ],
                  ),
                ),
              ),
            );
          });
    }

    Widget _buildBudgetCard(int index) => Container(
          padding:  EdgeInsets.only(top: 2.0, left: 10.0, right: 10.0, bottom: 5.0),
          width: MediaQuery.of(context).size.width,
          height: 150,
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
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: <Widget>[
              //  Text
              Row(
                children: <Widget>[
                  Text(
                    "${getAllBudgets[index].name}", style: TextStyle(fontSize: 18, color: Colors.blueAccent.shade700, fontWeight: FontWeight.bold, decoration: TextDecoration.underline),
                  ),
                  Spacer(),
                  // TextButton(onPressed: (){}, child: Icon(Icons.edit, color: Color(0xFF2D4B03))),
                  IconButton(onPressed: () { showBudgetEditDialog(index, context);}, icon: Icon(Icons.edit, color: Color(0xFF2D4B03), size: 25,), padding: EdgeInsets.zero, constraints: BoxConstraints(),),
                  SizedBox(width: 15.0,),
                  IconButton(onPressed: () { showBudgetDeleteDialog(index, context);}, icon: Icon(Icons.delete, color: Color(0xFF2D4B03), size: 25,), padding: EdgeInsets.zero, constraints: BoxConstraints(),),
                  // Container(
                  //   // padding: EdgeInsets.symmetric(horizontal: 5.0),
                  //   child: Row(
                  //     // crossAxisAlignment: CrossAxisAlignment.end,
                  //     // mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  //     children: [
                  //       TextButton(onPressed: (){}, child: Icon(Icons.edit, color: Color(0xFF2D4B03),)),
                  //     ],
                  //   ),
                  // ),
                ],
              ),
              Text("Category: ${findCategory(getAllCategories, getAllBudgets[index].categoryId)}", style: TextStyle(fontSize: 15, color: Color(0xFF2D4B03), fontWeight: FontWeight.bold),),
              Text("Start Date: ${getAllBudgets[index].justDate()}", style: TextStyle(fontSize: 15, color: Color(0xFF2D4B03), fontWeight: FontWeight.bold),),
              Stack(
                alignment: Alignment.center,
                children: <Widget>[
                  LinearPercentIndicator(
                    lineHeight: 20.0,
                    percent: (getAllBudgets[index].actualPrice/getAllBudgets[index].expectedPrice),
                    progressColor: (getAllBudgets[index].actualPrice/getAllBudgets[index].expectedPrice) <= 0.5 ? Colors.green.shade400 : Colors.red.shade500,
                    backgroundColor: Colors.white70,
                  ),
                  Text("${(getAllBudgets[index].actualPrice/getAllBudgets[index].expectedPrice)*100}%", textAlign: TextAlign.center, style: TextStyle(fontSize: 15, color: Color(0xFF000000), fontWeight: FontWeight.bold),),
                ],
              ),

              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text("${(getAllBudgets[index].actualPrice)} of ${(getAllBudgets[index].expectedPrice)}", style: TextStyle(fontSize: 15, color: Color(0xFF2D4B03), fontWeight: FontWeight.bold),),
                  SizedBox(width: 20.0,),
                ],
              ),
            ],
          ),
    );

    Widget _buildExtraCard(int index) => Container(
      padding:  EdgeInsets.only(top: 2.0, left: 10.0, right: 10.0, bottom: 5.0),
      width: MediaQuery.of(context).size.width,
      height: 150,
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
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: <Widget>[
          //  Text
          Row(
            children: <Widget>[
              Text(
                "${getAllExtras[index].name}", style: TextStyle(fontSize: 18, color: Colors.blueAccent.shade700, fontWeight: FontWeight.bold, decoration: TextDecoration.underline),
              ),
              Spacer(),
              // TextButton(onPressed: (){}, child: Icon(Icons.edit, color: Color(0xFF2D4B03))),
              IconButton(onPressed: () { showExtraEditDialog(index, context);}, icon: Icon(Icons.edit, color: Color(0xFF2D4B03), size: 25,), padding: EdgeInsets.zero, constraints: BoxConstraints(),),
              SizedBox(width: 15.0,),
              IconButton(onPressed: () { showExtraDeleteDialog(index, context);}, icon: Icon(Icons.delete, color: Color(0xFF2D4B03), size: 25,), padding: EdgeInsets.zero, constraints: BoxConstraints(),),
              // Container(
              //   // padding: EdgeInsets.symmetric(horizontal: 5.0),
              //   child: Row(
              //     // crossAxisAlignment: CrossAxisAlignment.end,
              //     // mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              //     children: [
              //       TextButton(onPressed: (){}, child: Icon(Icons.edit, color: Color(0xFF2D4B03),)),
              //     ],
              //   ),
              // ),
            ],
          ),
          Text("Price: \$${getAllExtras[index].price}", style: TextStyle(fontSize: 15, color: Color(0xFF2D4B03), fontWeight: FontWeight.bold),),
          Text("Category: ${findCategory(getAllCategories, getAllExtras[index].categoryId)}", style: TextStyle(fontSize: 15, color: Color(0xFF2D4B03), fontWeight: FontWeight.bold),),
          Text("Date: ${getAllExtras[index].justDate()}", style: TextStyle(fontSize: 15, color: Color(0xFF2D4B03), fontWeight: FontWeight.bold),),
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
                                        child: Text('Display', style: TextStyle(fontSize: 30,  fontWeight: FontWeight.bold, color: Color(0xFF2D4B03)),),
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
                                          getAllCat();
                                          if (newIndex == 0)
                                          {
                                            getAllBud();
                                          }

                                          if (newIndex == 2)
                                          {
                                            getAllExt();
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

                                              ],
                                            ),
                                          )
                                      ),
                                      // Budget visible
                                      Visibility(
                                        visible: isSelected[2],
                                        child: Column(
                                          // mainAxisSize: MainAxisSize.min,
                                          children: [
                                            ListView.separated(
                                              physics: NeverScrollableScrollPhysics(),
                                              scrollDirection: Axis.vertical,
                                              shrinkWrap: true,
                                              itemCount: getAllExtras.length,
                                              padding: EdgeInsets.symmetric(horizontal: 10.0, vertical: 10.0),
                                              itemBuilder: (context, index) {
                                                return _buildExtraCard(index);
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
              BottomNavigationBarItem(icon: Icon(Icons.addchart, size: 35.0), label: 'Display'),
              BottomNavigationBarItem(icon: Icon(Icons.add_circle_outline, size: 35.0), label: 'Add'),
              BottomNavigationBarItem(icon: Icon(Icons.calendar_month, size: 35.0), label: 'Calendar'),
              BottomNavigationBarItem(icon: Icon(Icons.account_circle, size: 35.0), label: 'Account'),
            ],
          ),
        )
    );
  }
}