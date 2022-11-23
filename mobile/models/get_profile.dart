import 'dart:convert';

getProfile welcomeFromJson(String str) => getProfile.fromJson(json.decode(str));

String welcomeToJson(getProfile data) => json.encode(data.toJson());

class getProfile {
  getProfile({
    required this.userId,
  });

  String userId;

  factory getProfile.fromJson(Map<String, dynamic> json) => getProfile(
    userId: json["userId"] as String,
  );

  Map<String, dynamic> toJson() => {
    "userId": userId,
  };
}
