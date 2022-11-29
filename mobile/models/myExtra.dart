import 'dart:convert';

List<MyExtra> getExtrasFromJson(String str) {
  final jsonData = jsonDecode(str);
  List<MyExtra> result = <MyExtra>[];
  print(jsonData);
  jsonData["oneOffs"].forEach((v) {print(v); print(jsonEncode(v));});

  jsonData["oneOffs"].forEach((v) {
    String json = jsonEncode(v);
    result.add(myExtraFromJson(json));
  });
  // for (Budget b in result) print(b.name);

  return result;
}

MyExtra myExtraFromJson(String str) => MyExtra.fromJson(json.decode(str));

String myExtraToJson(MyExtra data) => json.encode(data.toJson());

String myExtraToJsonEdit(MyExtra data) => json.encode(data.toJsonEdit());

class MyExtra {
  MyExtra({
    this.userId,
    required this.name,
    required this.price,
    this.categoryId,
    this.color,
    required this.date,
    this.id,
  });

  String? userId;
  String name;
  String? categoryId;
  String? color;
  String date;
  num price;
  String? id;

  factory MyExtra.fromJson(Map<String, dynamic> json) => MyExtra(
    userId: json["userId"],
    name: json["name"],
    price: json["price"],
    categoryId: json["categoryId"],
    color: json["color"],
    date: json["date"],
    id: json["id"],
  );

  Map<String, dynamic> toJson() => {
    "userId": userId,
    "name": name,
    "price": price,
    "categoryId": categoryId,
    "color": color ?? "ffffff",
    "date": date,
  };

  Map<String, dynamic> toJsonEdit() => {
    "userId": userId,
    "name": name,
    "price": price,
    "categoryId": categoryId,
    "color": color ?? "ffffff",
    "date": date,
    "id": id,
  };

  String justDate()
  {
    var split = this.date?.split(' ');
    if (split != null)
      return split.first;

    return "";
  }
}