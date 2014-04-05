var repeater;

function getData()
{
	var data = {
		tbs:PageData.tbs || "0",
		fr:PageData.product || "frs",
		forum_id:PageData.forum.id || 0,
		ie:"utf8"
	}

	$.post("tbscore/timebeat",data, postData);
}

function postData(dataObj)
{
	//set post data
	var giftInfo = dataObj.data.gift_info;

	for(var i = 0 ; i < giftInfo.length; ++i)
	{
		var info = giftInfo[i];

		var data = 
		{
			tbs:PageData.tbs || "0",
			fr:PageData.product || "frs",
			forum_id:PageData.forum.id || 0,
			ie:"utf8",
			type:info.gift_type == 1 ? "time" : "rand",
			gift_key:info.gift_key
		}
		
		$.post("http://tieba.baidu.com/tbscore/opengift",data, getPostAnswer);
	}

	console.log("再来");
	repeater = setTimeout("getData()",1000);
}

function getPostAnswer(responsedData)
{
	if(responsedData.no == 0)
		document.write("捡到一个" + responsedData.data.gift_got.gift_score + "的蛋...<br/>");
}

document.body.innerHTML = "";
repeater = setTimeout("getData()",10000);
