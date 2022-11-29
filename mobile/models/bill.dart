// To parse this JSON data, do
//
//     final bill = billFromJson(jsonString);

import 'dart:convert';

Bill billFromJson(String str) => Bill.fromJson(json.decode(str));

String billToJson(Bill data) => json.encode(data.toJson());

class Bill {
  Bill({
    required this.userId,
    required this.name,
    this.categoryId,
    this.color,
    required this.price,
    required this.startDate,
    required this.endDate,
    this.unPaid,
    this.isPaid,
    this.recurrence,
  });

  String userId;
  String name;
  String? categoryId;
  String? color;
  String? recurrence;
  num price;
  String startDate;
  String endDate;
  List<DateTime>? unPaid = <DateTime>[];
  // create instance of empty list
  List<DateTime>? isPaid = <DateTime>[];

  factory Bill.fromJson(Map<String, dynamic> json) => Bill(
    userId: json["userId"],
    name: json["name"],
    categoryId: json["categoryId"],
    color: json["color"],
    price: json["price"],
    startDate: json["startDate"],
    endDate: json["endDate"],
    isPaid: json["isPaid"],
    recurrence: json["recurrence"],
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
}