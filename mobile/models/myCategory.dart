import 'dart:convert';

List<MyCategory> getCategoriesFromJson(String str) {
  final jsonData = jsonDecode(str);
  List<MyCategory> result = <MyCategory>[];
  print(jsonData);
  jsonData["categories"].forEach((v) {print(v); print(jsonEncode(v));});

  jsonData["categories"].forEach((v) {
    String json = jsonEncode(v);
    result.add(myCategoryFromJson(json));

  });
  // for (Budget b in result) print(b.name);

  return result;
}

MyCategory myCategoryFromJson(String str) => MyCategory.fromJson(json.decode(str));

String myCategoryToJson(MyCategory data) => json.encode(data.toJson());

class MyCategory {
  MyCategory({
    this.userId,
    required this.name,
    this.id,
  });

  String? userId;
  String name;
  String? id;

  factory MyCategory.fromJson(Map<String, dynamic> json) => MyCategory(
    name: json["name"],
    id: json["id"],
  );

  Map<String, dynamic> toJson() => {
    "userId": userId,
    "name": name,
  };
}
