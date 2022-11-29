// api call functions
import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:mobile/global.dart' as global;
import 'package:mobile/models/bill.dart';
import 'package:mobile/models/budget.dart';

import 'models/get_profile.dart';
import 'models/myExtra.dart';

const String baseUrl = 'https://us-central1-cop4331-large-project-27.cloudfunctions.net/webApi';

// final String id = global.userId;

Map getData(String id) => {
  "userId": id
};

Map getDeleteData(String userId, String? id) => {
  "userId": userId,
  "id": id,
};

class BaseClient
{
  var client = http.Client();

  _setHeaders() => {
    'Content-type':'application/json',
    'Accept':'application/json'
  };

  // parameter budget object
  Future<dynamic> postBudget(dynamic object) async {
    var url = Uri.parse(baseUrl + '/CreateBudget');

    var _payload = jsonEncode(object);

    var response = await client.post(url, body: _payload, headers: _setHeaders());
    if (response.statusCode == 201){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }

  // parameter user id
  Future<dynamic> getBudgets(String id) async {
    var url = Uri.parse(baseUrl + '/GetBudgets');

    var _payload = jsonEncode(getData(id));

    var response = await client.post(url, body: _payload, headers: _setHeaders());
    if (response.statusCode == 201){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }

  // parameter budget object
  Future<dynamic> editBudget(Budget object) async {
    var url = Uri.parse(baseUrl + '/EditBudget');

    var _payload = budgetToJsonEdit(object);

    var response = await client.post(url, body: _payload, headers: _setHeaders());
    if (response.statusCode == 201){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }

  Future<dynamic> deleteBudget(String userId, String? id) async {
    var url = Uri.parse(baseUrl + '/RemoveBudget');

    var _payload = jsonEncode(getDeleteData(userId, id));

    var response = await client.post(url, body: _payload, headers: _setHeaders());
    if (response.statusCode == 201){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }

  Future<dynamic> postBill(dynamic object) async {
    var url = Uri.parse(baseUrl + '/CreateBill');

    var _payload = jsonEncode(object);

    var response = await client.post(url, body: _payload, headers: _setHeaders());
    print(response.statusCode);
    if (response.statusCode == 201){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }

  Future<dynamic> getBills(String id) async {
    var url = Uri.parse(baseUrl + '/GetBills');

    var _payload = jsonEncode(getData(id));

    var response = await client.post(url, body: _payload, headers: _setHeaders());
    if (response.statusCode == 201){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }

  // parameter budget object
  Future<dynamic> editBill(Bill object) async {
    var url = Uri.parse(baseUrl + '/EditBill');

    var _payload = billToJsonEdit(object);

    var response = await client.post(url, body: _payload, headers: _setHeaders());
    if (response.statusCode == 201){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }

  Future<dynamic> deleteBill(String userId, String? id) async {
    var url = Uri.parse(baseUrl + '/RemoveBill');

    var _payload = jsonEncode(getDeleteData(userId, id));

    var response = await client.post(url, body: _payload, headers: _setHeaders());
    if (response.statusCode == 201){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }

  Future<dynamic> getCategories(String id) async {
    var url = Uri.parse(baseUrl + '/GetCategories');

    var _payload = jsonEncode(getData(id));

    var response = await client.post(url, body: _payload, headers: _setHeaders());
    if (response.statusCode == 201){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }

  Future<dynamic> postCategory(dynamic object) async {
    var url = Uri.parse(baseUrl + '/CreateCategory');

    var _payload = jsonEncode(object);

    var response = await client.post(url, body: _payload, headers: _setHeaders());
    if (response.statusCode == 201){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }

  Future<dynamic> postExtra(dynamic object) async {
    var url = Uri.parse(baseUrl + '/CreateOneOff');

    var _payload = jsonEncode(object);

    var response = await client.post(url, body: _payload, headers: _setHeaders());
    print(response.statusCode);
    if (response.statusCode == 201){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }

  Future<dynamic> getExtras(String id) async {
    var url = Uri.parse(baseUrl + '/GetOneOffs');

    var _payload = jsonEncode(getData(id));

    var response = await client.post(url, body: _payload, headers: _setHeaders());
    if (response.statusCode == 201){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }

  Future<dynamic> editExtra(MyExtra object) async {
    var url = Uri.parse(baseUrl + '/EditOneoff');

    var _payload = myExtraToJsonEdit(object);

    var response = await client.post(url, body: _payload, headers: _setHeaders());
    if (response.statusCode == 201){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }


  Future<dynamic> deleteExtra(String userId, String? id) async {
    var url = Uri.parse(baseUrl + '/RemoveOneOff');

    var _payload = jsonEncode(getDeleteData(userId, id));

    var response = await client.post(url, body: _payload, headers: _setHeaders());
    if (response.statusCode == 201){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }

  Future<dynamic> getUserProfile(String id) async {
    var url = Uri.parse(baseUrl + '/GetUserProfile');
    var _payload = jsonEncode(getProfile(userId: id));
    print(_payload);
    var response = await client.post(url, body: _payload, headers: _setHeaders());
    print(response);
    if (response.statusCode == 201 || response.statusCode == 200){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }

  Future<dynamic> createProfile(dynamic object) async {
    var url = Uri.parse(baseUrl + '/CreateUserProfile');

    var _payload = jsonEncode(object);

    var response = await client.post(url, body: _payload, headers: _setHeaders());
    print(response.statusCode);
    if (response.statusCode == 201){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }

  Future<dynamic> editProfile(dynamic object) async {
    var url = Uri.parse(baseUrl + '/EditUserProfile');

    var _payload = jsonEncode(object);

    var response = await client.post(url, body: _payload, headers: _setHeaders());
    print(response.statusCode);
    if (response.statusCode == 201){
      print("api success");
      return response.body;
    } else {
      print("api fail");
      return Future.error("Fail");
    }
  }


}