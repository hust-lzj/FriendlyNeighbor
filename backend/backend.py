# 导入flask框架:
from flask import Flask, jsonify
from flask import request
# 导入MySQL驱动:
import mysql.connector
# 导入datetime模块:
import datetime
from datetime import timedelta
import requests
import json
import math


class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            # 将 datetime 对象转换为指定格式的字符串
            return obj.strftime('%Y-%m-%d')
        return json.JSONEncoder.default(self, obj)

def haversine(lat1, lon1, lat2, lon2):
    """
    Calculate the Haversine distance between two points on the earth (specified in decimal degrees)
    """
    # 将十进制度数转为弧度
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
    # Haversine公式
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    c = 2 * math.asin(math.sqrt(a))
    r = 6371  # 地球平均半径，单位为公里
    return c * r

def FilterTime(data_list,days):
    target_date = datetime.datetime.now()
    # 筛选出七天内的数据，包括target_date当天的数据，但不包括之后的数据
    if days == 1:
        filtered_data = [data for data in data_list if
                         target_date - timedelta(days=1) <= data[6] < target_date + timedelta(days=1)]
    elif days == 7:
        filtered_data = [data for data in data_list if
                         target_date - timedelta(days=7) <= data[6] < target_date + timedelta(days=1)]
    elif days == 30:
        filtered_data = [data for data in data_list if
                         target_date - timedelta(days=30) <= data[6] < target_date + timedelta(days=1)]
    else:
        filtered_data = data_list
    return filtered_data

def FilterDistance(Lat,Lng,distance_range,data_list):
    # 指定经纬度点
    target_latitude = Lat
    target_longitude = Lng

    if distance_range !=0 :
    # 距离范围（单位：公里）
        distance_range = distance_range/1000

        # 筛选出在指定经纬度点距离范围内的数据
        filtered_data = [
            data_point for data_point in data_list
            if haversine(eval(data_point[7]), eval(data_point[8]), target_latitude, target_longitude) <= distance_range
        ]
    else:
        filtered_data = data_list
    return filtered_data

app = Flask(__name__)

app.json_encoder = DateTimeEncoder

@app.route('/help/search/', methods=['GET', 'POST'])
def SearchForHelp():
    if request.method == 'POST':
        name = request.form.get("name", type=str, default=None)
        # thing = request.form.get("thing", type=str, default=None)
        number = request.form.get("number", type=str, default=None)
        way = request.form.get("way", type=str, default=None)
        introduce = request.form.get("introduce", type=str, default=None)
        user_name = request.form.get("user_name", type=str, default=None)
        type0 = request.form.get("type0", type=int, default=None)
        time0_ = request.form.get("time0", type=str, default=None)
        time0 = datetime.datetime.strptime(time0_,"%Y-%m-%d")
        Lat = request.form.get("Lat", type=float, default=None)
        Lng = request.form.get("Lng", type=float, default=None)
        nearby = request.form.get("nearby", type=str, default=None)
        user_id = request.form.get("user_id",type=int,default=None)
        conn = mysql.connector.connect(user='root', password='root', database='test')
        cursor = conn.cursor()
        cursor.execute(
            'insert into forhelp (name, number, way, introduce, user_name, type0,time0, Lat, Lng, nearby, now,user_id) '
            'values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,%s)',
            [name, number, way, introduce, user_name, type0, time0, Lat, Lng, nearby, 1,user_id])
        conn.commit()
        cursor.close()
    return "发帖成功"

@app.route('/share/search/', methods=['GET', 'POST'])
def SearchForShare():
    if request.method == 'POST':
        name = request.form.get("name", type=str, default=None)
        # thing = request.form.get("thing", type=str, default=None)
        number = request.form.get("number", type=str, default=None)
        way = request.form.get("way", type=str, default=None)
        introduce = request.form.get("introduce", type=str, default=None)
        user_name = request.form.get("user_name", type=str, default=None)
        type0 = request.form.get("type0", type=int, default=None)
        time0_ = request.form.get("time0", type=str, default=None)
        time0 = datetime.datetime.strptime(time0_,"%Y-%m-%d")
        Lat = request.form.get("Lat", type=float, default=None)
        Lng = request.form.get("Lng", type=float, default=None)
        nearby = request.form.get("nearby", type=str, default=None)
        user_id = request.form.get("user_id", type=int, default=None)
        conn = mysql.connector.connect(user='root', password='root', database='test')
        cursor = conn.cursor()
        cursor.execute(
            'insert into forshare (name, number, way, introduce, user_name, type0,time0, Lat, Lng, nearby, now,user_id) '
            'values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s ,%s)',
            [name, number, way, introduce, user_name, type0, time0, Lat, Lng, nearby, 1,user_id])
        conn.commit()
        cursor.close()
    return "发帖成功"

@app.route('/test/getform/', methods=['GET', 'POST'])
def test():
    dTime = request.form.get('dTime', type=int, default=0)
    Type0 = request.form.get('Type',type=int ,default=0)
    distance = request.form.get('distance',type=int ,default=0)#单位米
    Lat = request.form.get('Lat',type=float ,default=0)
    Lng = request.form.get('Lng',type=float ,default=0)
    conn = mysql.connector.connect(user='root', password='root', database='test',buffered = True)
    cursor = conn.cursor()
    # cursor.execute('select * from forhelp WHERE now = 1 ORDER BY RAND() LIMIT 3')
    if Type0 != 0:
        cursor.execute(f'select * from forhelp WHERE now = 1 AND type0 = {Type0} ORDER BY RAND() LIMIT 3')
    else:
        cursor.execute('select * from forhelp WHERE now = 1 ORDER BY RAND() LIMIT 3')
    rest_time = cursor.fetchall()
    rest_distance = FilterTime(data_list=rest_time,days=dTime)
    rest = FilterDistance(distance_range=distance,Lat=Lat,Lng=Lng,data_list=rest_distance)
    conn.commit()
    cursor.close()
    if len(rest)<3:
        for i in range(0,3-len(rest)):
            rest.append(['暂无更多','','','','','','','','','','',''])
    else:
        rest = rest[0:3]
    if rest != None:
        return jsonify(rest)
    else:
        return '未查询到信息'

@app.route('/test/getform2/', methods=['GET', 'POST'])
def test2():
    dTime = request.form.get('dTime', type=int, default=0)
    Type0 = request.form.get('Type',type=int ,default=0)
    distance = request.form.get('distance',type=int ,default=0)#单位米
    Lat = request.form.get('Lat',type=float ,default=0)
    Lng = request.form.get('Lng',type=float ,default=0)
    conn = mysql.connector.connect(user='root', password='root', database='test',buffered = True)
    cursor = conn.cursor()
    # cursor.execute('select * from forshare WHERE now = 1 ORDER BY RAND() LIMIT 3')
    if Type0 != 0:
        cursor.execute(f'select * from forshare WHERE now = 1 AND type0 = {Type0} ORDER BY RAND() LIMIT 3')
    else:
        cursor.execute('select * from forshare WHERE now = 1 ORDER BY RAND() LIMIT 3')
    rest_time = cursor.fetchall()
    rest_distance = FilterTime(data_list=rest_time,days=dTime)
    rest = FilterDistance(distance_range=distance,Lat=Lat,Lng=Lng,data_list=rest_distance)
    conn.commit()
    cursor.close()
    if len(rest)<3:
        for i in range(0,3-len(rest)):
            rest.append(['暂无更多','','','','','','','','','','',''])
    else:
        rest = rest[0:3]
    if rest != None:
        return jsonify(rest)
    else:
        return '未查询到信息'

@app.route('/login/', methods=['GET', 'POST'])
def user_login():
    if request.method == 'POST':
        js_code = request.form.get("js_code", type=str, default=None)
        Lat = request.form.get("Lat", type=float, default=None)
        Lng = request.form.get("Lng", type=float, default=None)
        nearby = ''
        url = 'https://api.weixin.qq.com/sns/jscode2session'
        rq_data = {
            'appid':'wx5ce87eda38f2c377',
            'secret':'92b47108e2ac1dbd7863489ee5e91b76',
            'js_code':js_code,
            'grant_type':'authorization_code'
        }
        response = requests.post(url=url,data=rq_data).text
        return_data_dict = json.loads(response)
        conn = mysql.connector.connect(user='root', password='root', database='test')
        cursor = conn.cursor()
        cursor.execute(f"select n from user WHERE (openid = '{return_data_dict['openid']}')")
        results = cursor.fetchall()
        if results:
            conn.commit()
            cursor.close()
            return jsonify(results)
        else:
            cursor.execute(
                'insert into user (openid, Lat, Lng, nearby) '
                'values (%s, %s, %s, %s)',
                [return_data_dict['openid'], Lat, Lng,nearby])
            cursor.execute(f"select n from user WHERE (openid = '{return_data_dict['openid']}')")
            results = cursor.fetchall()
            conn.commit()
            cursor.close()
            return jsonify(results)

@app.route('/test/gethistory1/', methods=['GET', 'POST'])
def gethistory1():
    user_id = request.form.get("user_id", type=str, default=None)
    conn = mysql.connector.connect(user='root', password='root', database='test',buffered = True)
    cursor = conn.cursor()
    cursor.execute(f'select * from forhelp WHERE user_id = "{user_id}" AND now = 0')
    rest_num = len(cursor.fetchall())
    cursor.execute(f'select * from forhelp WHERE user_id = "{user_id}" LIMIT 3')
    rest = cursor.fetchall()
    conn.commit()
    cursor.close()
    if len(rest)<3:
        for i in range(0,3-len(rest)):
            rest.append(['暂无更多','','','','','','','','','','',''])
    if rest != None:
        return jsonify(rest+[rest_num])
    else:
        return '未查询到信息'

@app.route('/test/gethistory2/', methods=['GET', 'POST'])
def gethistory2():
    user_id = request.form.get("user_id", type=str, default=None)
    conn = mysql.connector.connect(user='root', password='root', database='test',buffered = True)
    cursor = conn.cursor()
    cursor.execute(f'select * from forshare WHERE user_id = "{user_id}" AND now = 0')
    rest_num = len(cursor.fetchall())
    cursor.execute(f'select * from forshare WHERE user_id = "{user_id}" LIMIT 3')
    rest = cursor.fetchall()
    conn.commit()
    cursor.close()
    if len(rest)<3:
        for i in range(0,3-len(rest)):
            rest.append(['暂无更多','','','','','','','','','','',''])
    if rest != None:
        return jsonify(rest+[rest_num])
    else:
        return '未查询到信息'

@app.route('/help/finish/', methods=['GET', 'POST'])
def Complete1():
    if request.method == 'POST':
        name = request.form.get("name", type=str, default=None)
        number = request.form.get("number", type=str, default=None)
        way = request.form.get("way", type=str, default=None)
        introduce = request.form.get("introduce", type=str, default=None)
        user_name = request.form.get("user_name", type=str, default=None)
        type0 = request.form.get("type0", type=int, default=None)
        time0_ = request.form.get("time0", type=str, default=None)
        time0 = datetime.datetime.strptime(time0_, "%Y-%m-%d")
        Lat = request.form.get("Lat", type=float, default=None)
        Lng = request.form.get("Lng", type=float, default=None)
        nearby = request.form.get("nearby", type=str, default=None)
        now = request.form.get("now",type=int,default=None)
        user_id = request.form.get("user_id", type=int, default=None)
        conn = mysql.connector.connect(user='root', password='root', database='test')
        cursor = conn.cursor()
        cursor.execute('update forhelp set now = %s WHERE user_id = %s AND name = %s AND number = %s AND way = %s AND '
                       'introduce = %s AND user_name = %s AND type0 = %s AND time0 = %s AND Lat = %s AND Lng = %s AND nearby = %s',
                       [now,user_id,name,number,way,introduce,user_name,type0,time0,Lat,Lng,nearby])
        conn.commit()
        cursor.close()
    return '修改成功'

@app.route('/share/finish/', methods=['GET', 'POST'])
def Complete2():
    if request.method == 'POST':
        name = request.form.get("name", type=str, default=None)
        number = request.form.get("number", type=str, default=None)
        way = request.form.get("way", type=str, default=None)
        introduce = request.form.get("introduce", type=str, default=None)
        user_name = request.form.get("user_name", type=str, default=None)
        type0 = request.form.get("type0", type=int, default=None)
        time0_ = request.form.get("time0", type=str, default=None)
        time0 = datetime.datetime.strptime(time0_, "%Y-%m-%d")
        Lat = request.form.get("Lat", type=float, default=None)
        Lng = request.form.get("Lng", type=float, default=None)
        nearby = request.form.get("nearby", type=str, default=None)
        now = request.form.get("now", type=int, default=None)
        user_id = request.form.get("user_id", type=int, default=None)
        conn = mysql.connector.connect(user='root', password='root', database='test')
        cursor = conn.cursor()
        cursor.execute('update forshare set now = %s WHERE user_id = %s AND name = %s AND number = %s AND way = %s AND '
                       'introduce = %s AND user_name = %s AND type0 = %s AND time0 = %s AND Lat = %s AND Lng = %s AND nearby = %s',
                       [now, user_id, name, number, way, introduce, user_name, type0, time0, Lat, Lng, nearby])
        conn.commit()
        cursor.close()
    return '修改成功'

@app.route('/getmessage/', methods=['GET', 'POST'])
def getmessage():
    if request.method == 'POST':
        message = request.form.get("message", type=str, default=None)
        user_name = request.form.get("user_name", type=str, default=None)
        time0_ = request.form.get("time0", type=str, default=None)
        time0 = datetime.datetime.strptime(time0_, "%Y-%m-%d")
        Lat = request.form.get("Lat", type=float, default=None)
        Lng = request.form.get("Lng", type=float, default=None)
        user_id = request.form.get("user_id", type=int, default=None)
        conn = mysql.connector.connect(user='root', password='root', database='test')
        cursor = conn.cursor()
        cursor.execute('insert into usermessage (message,user_id,user_name,time0, Lat, Lng) '
                'values (%s, %s, %s, %s, %s, %s)',
                [message,user_id,user_name,time0, Lat, Lng])
        conn.commit()
        cursor.close()
    return '提交成功'

if __name__ == "__main__":
    app.run(debug=True)
