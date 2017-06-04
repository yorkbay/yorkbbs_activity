/**
 * Created by jack on 5/23/17.
 */
import './comment.html';
import {Comment} from '../../../api/comment/comment.js';
import {commentmodifyst,commentmodifyreview,commentmodifystbyid} from '../../../api/comment/methods.js';

const numOfRecords = 5;

const PostSubs = new SubsManager({
    // maximum number of cache subscriptions
    cacheLimit: 10,
    // any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 5
});

Template.admin_comment_list.onCreated(function(){
    const instance = this;

    instance.ready = new ReactiveVar();
    instance.limit = new ReactiveVar(numOfRecords);
    instance.review = new ReactiveVar("");
    instance.key = new ReactiveVar("");


    instance.btime = () => {
        return FlowRouter.getQueryParam('btime')||"";
    };
    instance.etime = () => {
        return FlowRouter.getQueryParam('etime')||"";
    };
    instance.st = () => {
        return FlowRouter.getQueryParam('st')||"";
    };



    instance.autorun(function () {
        const key = instance.key.get();
        const btime = new Date(instance.btime());
        const etime = new Date(instance.etime());
        const st = instance.st();
        const review = instance.review.get();
        const limit = instance.limit.get();

        instance.subscribe('commentslist', {
            key,btime, etime,limit,st,review
        });

        instance.ready.set(PostSubs.ready());
    });
});


Template.admin_comment_list.onRendered(function releaseOnRendered() {

    /*
    $('#startdate').datetimepicker({
        format:'Y/m/d',
        onShow:function( ct ){
            this.setOptions({
                maxDate:jQuery('#enddate').val()?jQuery('#enddate').val():false
            })
        },
        timepicker:false
    });
    $('#enddate').datetimepicker({
        format:'Y/m/d',
        onShow:function( ct ){
            this.setOptions({
                minDate:jQuery('#startdate').val()?jQuery('#startdate').val():false
            })
        },
        timepicker:false
    });
    */
    $('#startdate').datetimepicker({
        format: 'YYYY-MM-DD'
    });
    $('#enddate').datetimepicker({
        format: 'YYYY-MM-DD'
    });
});

Template.admin_comment_list.helpers({
    "list_item": function () {

        const instance = Template.instance();
        const key = instance.key.get();
        const btime = instance.btime();
        const etime = instance.etime();
        const st = instance.st();
        const review = instance.review.get();
        const limit = instance.limit.get();

        var query={};


        if(key){

            let regex = new RegExp( key, 'i' );
            query={
                ct:regex
            }

        }
        if(st){
            query.st=st;
        }

        if(review){
            if(review =="true"){
                query.review=true;
            }else{
                query.review=false;
            }
        }


        return Comment.find(query,{limit:limit,sort:{'meta.dt':-1}});
    },
    "display_review":function (review) {
      return review?"审核":"未审核";
    }
});


Template.admin_comment_list.events({
    'click #more'(event, instance) {
        instance.limit.set(instance.limit.get() + numOfRecords);
    },
    'click .del'(event, instance) {
        var obj={
            _id:$(event.currentTarget).attr("itemid"),
            st:"del"
        }

        commentmodifyst.call(obj);
    },
    'click .review'(event, instance) {
        var obj={
            _id:$(event.currentTarget).attr("itemid"),
            review:true
        }
        console.log(obj);
        commentmodifyreview.call(obj);
    },
    'change #review'(event,instance){
        var val= $(event.currentTarget).val();
        instance.review.set(val);
    },
    'click #search'(event,instance){
        var val= $("#keyword").val();
        instance.key.set(val);
    },
    'click #delall'(event,instance){
        var itemid=[];
        $('input[name="delcheckbox"]:checked').each(function() {
            itemid.push(this.value);
        });
        var obj={
            _id:itemid,
            st:"del"
        }
        commentmodifystbyid.call(obj);
    }

});