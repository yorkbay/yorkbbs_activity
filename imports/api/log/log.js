
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

class LogCollection extends Mongo.Collection {}

export const Log = new LogCollection('logs');

/*
 Comment.allow({
 insert:function(){
 return true;
 },
 update:function (userId,doc) {
 return !!userId;
 }
 });
 */


Log.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});


Log.schema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    ty: {
        type: String,
        optional:true,
        label: "front|backend"
    },
    action: {
        type: String,
        optional:true,
        label: "查看信息|发布评论|收藏信息|信息纠错|发布信息|登录后台|审核信息|审核评论|处理举报|设置权限|删除信息|删除评论|删除举报"
    },
    ip: {
        type: String,
        optional:true,
        label: "ip"
    },
    from: {
        type: String,
        optional:true,
        label: "from"
    },
    refid: {
        type: String,
        optional:true,
        label: "activity id"
    },
    ti:{
        type: String,
        optional:true,
        label: "activity ti"
    },
    'meta.uid': {
        type: String,
        label: "user id",
        optional:true
    },
    'meta.usr': {
        type: String,
        label: "user",
        optional:true
    },
    'meta.dt': {
        type: Date,
        label: "create date",
        optional:true
    }
});


Log.attachSchema(Log.schema);

