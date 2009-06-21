(function(){
	//set jquery find
	jQuery.extend({pureCompile:$p.compile, pureRender:$p.render, pureConfig:$p.config, autoRender:$p.autoRender});
	jQuery.pureConfig(
		{find:function(n, sel){
			return $(n).find(sel);
		}
	});

	var data = {
		friends:[
			{
				name:'Hughes', 
				twitter:'hugheswaroquier',
				knowledge:['erlang', 'js', 'css']
			},{
				name:'Yves', 
				twitter:'yveshiernaux',
				knowledge:['js', 'css', 'buzz']
			}
		], 
		who:'Mic'
	};
	
	directive = {
		'span.who': 'who'};/*,
		'li.friends':{
			'friends <- friends':
				{
					'a':'friends.name',
					'a[href]+':'friends.twitter',
					'a[title]':'View twitter account of #{friends.name}',
					'a[onclick]':'alert(#{friends.name});',
					'li.knowledges':{
						'knowledges<-friends.knowledges':{
							'span.knowledges':'#{knowledges}: #{friends.name}'
						}
					}
				}
		}
	};*/
	directive1 = {
		'$1$': 'who',
		'$2$':{
			'friends <- friends':
				{
					'$3$':'friends.name',
					'$3$[href]+':'friends.twitter',
					'$3$[title]':'View twitter account of #{friends.name}',
					'$3$[onclick]':'alert(#{friends.name});',
					'$4$':{
						'knowledge<-friends.knowledges':{
							'$5$':'#{knowledge}: #{friends.name}'
						}
					}
				}
		}
		//,'li a[title]':'View twitter account of #{friends.name}'
	};


	var n = $('div.ar1');
	var elem = jQuery.pureCompile(n.get(0), false, data);
	$('div.e1').get(0).innerHTML = elem;
	
	var data = {
		teams: [{
			name: 'Cats',
			players: [	
				{first: 'Alice', last: 'Kea\'sler', score: [16, 15, 99, 100]}, 
				{first: '', name: '', score: 0},
				{first: 'Vicky', last: 'Benoit', score: [3, 5]}, 
				{first: 'Wayne', last: 'Dartt', score: [9, 10]}]}, {

			name: 'Dogs',
			players: [
				{first: 'Ray', last: 'Braun', score: 14}, 
				{first: 'Aaron', last: 'Ben', score: 24}, 
				{first: 'Steven', last: 'Smith', score: 1}, 
				{first: 'Kim', last: 'Caffey', score: 19}]}, {

			name: 'Mice',
			players: [
				{first: 'Natalie', last: 'Kinney', score: 16}, 
				{first: 'Caren', last: 'Cohen', score: 3}]}]}
	directive = {
		'table.scoreBoard > tbody > tr': {
			'team <- teams': {
				'td.teamName' : 'team.name',
				'table.teamList > tbody > tr': {
					'player <- team.players': {
						'td.player': '#{player.first} (#{player.last})',
						'td.score': '#{player.score}',
						'td.position': function(arg){return arg.pos + 1},
						'root[class]+':
							function(arg){
								return (arg.player.pos % 2 == 1) ? ' odd' : ' even'
							}
					}
				}
			}
		}
	}

	var n = $('div.scoreBoard');
	var elem = jQuery.pureCompile(n.get(0), directive)(data);
	$('div.scoreBoard').get(0).innerHTML = elem;

	var countries = {
		children: [{
			name: 'Europe',
			children: [{
				name: 'Belgium',
				children: [{
					name: 'Brussels'},{
					name: 'Namur'},{
					name: 'Antwerpen'}]},{
				name: 'Germany'},{
				name: 'UK'}]},{
			name: 'America',
			children: [{
				name: 'US',
				children: [{
					name: 'Alabama'},{
					name: 'Georgia'}]},{
				name: 'Canada'},{
				name: 'Argentina'}]},{
			name: 'Asia'},{
			name: 'Africa'},{
			name: 'Antarctica'}]}

	var directive = {
		'li': {
			'child <- children': {
				'a': 'child.name',
				'a[onclick]':'alert(\'#{child.name}\');',
				'html | =div.children': function(ctxt){
					if(ctxt.child.item.children){
						return rfn(ctxt.child.item)
					} else {
						return '';
					}
				}
			}
		}
	}
	var rfn = jQuery.pureCompile($('ul.treeItem').get(0), directive);
	var h = rfn(countries);
	$('ul.treeItem').get(0).innerHTML = h;

  /*var hello = {
		who:[
			{name:'Mary'},
			{name:'Harry'}
		]
	};
	var dir = {
		'.who':{
			'person<-who':{
				'root':'person.name'
			}
		}
	};

	var template = $('ul.helloWho').get(0);
	var rfn = jQuery.pureCompile(template, false, hello);
	$('div.helloWho').get(0).innerHTML = rfn(hello);*/
	
})();
