var headerBar = [			
		'<div class="ps_icons left">',
			'<div class="ps_icon ps-icon-paperclip minmize" title="Minimizes Discussion"></div>',
			'<div class="ps_icon ps-icon-paperclip minmize_down" title="Minimizes Discussion"></div>',			
			'<div class="ps_icon ps-icon-export close_app" title="Minimizes Discussion"></div>',
		'</div>',

		'<div class="ps_icons right">',
			'<div class="ps_icon ps-icon-vcard add_user"  title="Change User ID"></div>',
			//'<div class="ps_icon ps-icon-cog settings"  title="Settings Menu"></div>',			
			'<div class="ps_icon ps-icon-users users"  title="Availible Users Online"></div>',
			//'<img src="'+chrome.extension.getURL("/images/page_swarm_users_icon.png")+'" width="30"/>',

		'</div>',

		'<div class="bottom_header">',
			'<div class="ps-icon-info terms_of_use"><div class="terms"><div class="terms_scroller">',

				//The tomato was introduced to cultivation in the Middle East by John Barker, British consul in Aleppo circa 1799 to 1825. Nineteenth century descriptions of its consumption are uniformly as an ingredient in a cooked dish. In 1881, it is described as only eaten in the region "within the last forty years". Today, the tomato is a critical and ubiquitous part of Middle Eastern cuisine, served fresh in salads (e.g. Arab salad, Israeli salad, Shirazi salad and Turkish salad), grilled with kebabs and other dishes, made into sauces, and so on.</p><p>Tomatoes were not grown in England until the 1590s. One of the earliest cultivators was John Gerard, a barber-surgeon. Gerard\'s Herbal, published in 1597, and largely plagiarized from continental sources, is also one of the earliest discussions of the tomato in England. Gerard knew the tomato was eaten in Spain and Italy. Nonetheless, he believed it was poisonous (in fact, the plant and raw fruit do have low levels of tomatine, but are not generally dangerous; see below). Gerard\'s views were influential, and the tomato was considered unfit for eating (though not necessarily poisonous) for many years in Britain and its North American colonies. By the mid-18th century, tomatoes were widely eaten in Britain, and before the end of that century, the Encyclopædia Britannica stated the tomato was "in daily use" in soups, broths, and as a garnish. They were not part of the average man\'s diet, however, and though by 1820 they were described as "to be seen in great abundance in all our vegetable markets" and to be "used by all our best cooks", reference was made to their cultivation in gardens still "for the singularity of their appearance", while their use in cooking was associated with Italian or Jewish cuisine.'
				'<h2>Terms Of Use</h2><p>Please read these Terms of Use (the "Agreement" or "Terms of Use") carefully before using the services offered by PageSwarm, Inc. or PageSwarm London Limited (together “PageSwarm” or the “Company”). This Agreement sets forth the legally binding terms and conditions for your use of the website at www.PageSwarm.com, all other sites owned and operated by PageSwarm that redirect to www.PageSwarm.com, and all subdomains (collectively, the “Site”), and the service owned and operated by the Company (together with the Site, the “Service”). By using the Service in any manner, including, but not limited to, visiting or browsing the Site or contributing content, information, or other materials or services to the Site, you agree to be bound by this Agreement.</p><h2>Summary of Service</h2><p>PageSwarm is a platform where certain users ("Project Creators") run campaigns to fund creative projects by offering rewards to raise money from other users (“Backers”). Through the Site, email, websites, and other media, the Service makes accessible various content, including, but not limited to, videos, photographs, images, artwork, graphics, audio clips, comments, data, text, software, scripts, projects, other material and information, and associated trademarks and copyrightable works (collectively, “Content”). Project Creators, Backers, and other visitors to and users of the Service (collectively, “Users”) may have the ability to contribute, add, create, upload, submit, distribute, facilitate the distribution of, collect, post, or otherwise make accessible ("Submit") Content. “User Submissions” means any Content Submitted by Users.</p><h2>Acceptance of Terms</h2><p>The Service is offered subject to acceptance of all of the terms and conditions contained in these Terms of Use, including the Privacy Policy available at https://www.PageSwarm.com/privacy, and all other operating rules, policies, and procedures that may be published on the Site by the Company, which are incorporated by reference. These Terms of Use apply to every user of the Service. In addition, some services offered through the Service may be subject to additional terms and conditions adopted by the Company. Your use of those services is subject to those additional terms and conditions, which are incorporated into these Terms of Use by this reference.</p><p>The Company reserves the right, at its sole discretion, to modify or replace these Terms of Use by posting the updated terms on the Site. It is your responsibility to check the Terms of Use periodically for changes. Your continued use of the Service following the posting of any changes to the Terms of Use constitutes acceptance of those changes.</p><p>The Company reserves the right to change, suspend, or discontinue the Service (including, but not limited to, the availability of any feature, database, or Content) at any time for any reason. The Company may also impose limits on certain features and services or restrict your access to parts or all of the Service without notice or liability.</p><p>The Service is available only to individuals who are at least 18 years old (and at least the legal age in your jurisdiction). You represent and warrant that if you are an individual, you are at least 18 years old and of legal age in your jurisdiction to form a binding contract, and that all registration information you submit is accurate and truthful. The Company reserves the right to ask for proof of age from you and your account may be suspended until satisfactory proof of age is provided. The Company may, in its sole discretion, refuse to offer the Service to any person or entity and change its eligibility criteria at any time. This provision is void where prohibited by law and the right to access the Service is revoked in those jurisdictions.</p>',

			'</p></div></div></div>',
			'<div class="connections"><span></span><span class="connection_count"></span> <span class="connections_txt">connections...  beta 1.0.1.8</span></div>',
		'</div>'

];
ich.addTemplate('headerBar', headerBar.join(''));

var usernameForm = [
	'<div class="usernameForm">',
		'<p>Enter your Nickname</p>',
		'<div>',
			'<input class="username" type="text" />',
			'<div class="join_btn">Join Page<div/>',	
		'</div>',	
	'</div>'
];
ich.addTemplate('usernameForm', usernameForm.join(''));

var chatArea = [
	'<div class="chatarea">',	
		'<div class="chat_wrapper">',												
			'<div class="message">',

				//'<textarea rows="4" class="data"></textarea>',
	
				'<div class="data" contenteditable="true"></div>',

				'<div class="facecons">',
						'<img src="http://icons.pageswarm.com/Ambivalent.png"     class="facecon icon-Ambivalent" />',
						'<img src="http://icons.pageswarm.com/Angry.png"    class="facecon icon-Angry"  />',
						'<img src="http://icons.pageswarm.com/Confused.png"    class="facecon icon-Confused"  />',
						'<img src="http://icons.pageswarm.com/Content.png"       class="facecon icon-Content"  />',
						'<img src="http://icons.pageswarm.com/Cool.png"      class="facecon icon-Cool"  />',
						'<img src="http://icons.pageswarm.com/Crazy.png"      class="facecon icon-Crazy"  />',
						'<img src="http://icons.pageswarm.com/Cry.png"      class="facecon icon-Cry"  />',
						'<img src="http://icons.pageswarm.com/Embarrassed.png"    class="facecon icon-Embarrassed"  />',
						'<img src="http://icons.pageswarm.com/Footinmouth.png"      class="facecon icon-Footinmouth"  />',
						'<img src="http://icons.pageswarm.com/Frown.png"   class="facecon icon-Frown"  />',
						'<img src="http://icons.pageswarm.com/Grin.png"  class="facecon icon-Grin"  />',
						//'<img src="http://icons.pageswarm.com/Gasp.png"   class="facecon icon-Gasp"  />',												
						'<img src="http://icons.pageswarm.com/Heart.png" class="facecon icon-Heart"  />',								
						//'<img src="http://icons.pageswarm.com/HeartEyes.png"   class="facecon icon-HeartEyes"  />',
						'<img src="http://icons.pageswarm.com/Innocent.png"  class="facecon icon-Innocent"  />',
						'<img src="http://icons.pageswarm.com/Kiss.png"   class="facecon icon-Kiss"  />',												
						'<img src="http://icons.pageswarm.com/Laughing.png" class="facecon icon-Laughing"  />',																		
					'</div>',	

			'</div>',
			'<div class="conversation_holder"><div class="conversation"><div class="spacer"></div></div></div>',
			//'<img src="http://mysocket.so:8000/images/active_status.png"/>',
		'</div>',
	'</div>'
];
ich.addTemplate('chatArea', chatArea.join(''));

var messagePostLeft = [
	'<div id="{{id}}" class="message_post left">', 
		'<p class="name"><strong>{{username}}</strong></p>',
		'<p class="message_data"><span class="date">({{date}})</span></br><span>{{{message}}}</span></p>',
	'</div>'
];

ich.addTemplate('messagePostLeft', messagePostLeft.join(''));

var messagePostRight = [
	'<div id="{{id}}" class="message_post right">', 
		'<p class="name"><strong>{{username}}</strong></p>',
		'<p class="message_data"><span class="date">({{date}})</span></br><span>{{{message}}}</span></p>',
	'</div>'
];

ich.addTemplate('messagePostRight', messagePostRight.join(''));

var updateChat = ['<p><strong>{{username}}:</strong>' +
		'<span class="date"> ({{date}}) </span></br>' + 
		'<span>{{data}}</span></p>'];
ich.addTemplate('updateChat', updateChat.join(''));


var settingsForm = [
	'<h2>SETTINGS</h2>',
	'<div class="settings">',
		'<ul>',
			'<li><input class="allowSearchFind" type="checkbox" /><label>Enable Live Links</label></li>',	
		'</ul>',			
	'</div>'
];
ich.addTemplate('settingsForm', settingsForm.join(''));


