// api call functions
import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:mobile/global.dart' as global;

const String baseUrl = 'https://us-central1-cop4331-large-project-27.cloudfunctions.net/webApi';

// final String id = global.userId;

Map getData(String id) => {
  "userId": id
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

  Future<dynamic> postBill(dynamic object) async {
    var url = Uri.parse(baseUrl + '/CreateBill');

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
}