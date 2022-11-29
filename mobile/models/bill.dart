// To parse this JSON data, do
//
//     final bill = billFromJson(jsonString);

import 'dart:convert';

List<Bill> getBillsFromJson(String str) {
  final jsonData = jsonDecode(str);
  List<Bill> result = <Bill>[];
  print(jsonData);
  jsonData["bills"].forEach((v) {print(v); print(jsonEncode(v));});

  jsonData["bills"].forEach((v) {
    String json = jsonEncode(v);
    result.add(billFromJson(json));
  });
  // for (Budget b in result) print(b.name);

  return result;
}

Bill billFromJson(String str) => Bill.fromJson(json.decode(str));

String billToJson(Bill data) => json.encode(data.toJson());

String billToJsonEdit(Bill data) => json.encode(data.toJsonEdit());

class Bill {
  Bill({
    this.userId,
    required this.name,
    this.categoryId,
    this.color,
    required this.price,
    required this.startDate,
    required this.endDate,
    this.unPaid,
    this.isPaid,
    this.recurrence,
    this.id,
  });

  String name;
  String? userId;
  String? categoryId;
  String? color;
  String? recurrence;
  String? id;
  num price;
  String startDate;
  String endDate;
  List<dynamic>? unPaid = <dynamic>[];
  // create instance of empty list
  List<dynamic>? isPaid = <dynamic>[];

  factory Bill.fromJson(Map<String, dynamic> json) => Bill(
    name: json["name"],
    categoryId: json["categoryId"],
    color: json["color"],
    price: json["price"],
    startDate: json["startDate"],
    endDate: json["endDate"],
    isPaid: json["isPaid"],
    recurrence: json["recurrence"],
    id: json["id"] as String,
  );

  Map<String, dynamic> toJson() => {
    "userId": userId,
    "name": name,
    "categoryId": categoryId ?? "-1",
    "color": color ?? "#ffffff",
    "price": price,
    "startDate": startDate,
    "endDate": endDate,
    "isPaid": isPaid ?? <String>[],
    "recurrence": recurrence ?? "monthly",
  };

  Map<String, dynamic> toJsonEdit() => {
    "userId": userId,
    "name": name,
    "categoryId": categoryId,
    "price": price,
    "startDate": startDate,
    "endDate": endDate,
    "id": id,
  };

  String justStartDate()
  {
    var split = this.startDate.split(' ');
    if (split != null)
      return split.first;

    return "";
  }

  String justEndDate()
  {
    var split = this.endDate.split(' ');
    if (split != null)
      return split.first;

    return "";
  }
}