var headerBar = [		
		
		//'<div class="ps_icons left">',
			//'<div class="ps_icon ps-icon-arrow-up minmize_up" title="Minimizes Discussion"></div>',
			//'<div class="ps_icon ps-icon-arrow-down minmize_down" title="Minimizes Discussion"></div>',
			//'<div class="ps_icon ps-icon-export close_app" title="Minimizes Discussion"></div>',
		//'</div>',

		'<div class="ps_icons right">',
			'<div class="ps_icon ps-icon-vcard add_user"  title="Change User ID"></div>',
			//'<div class="ps_icon ps-icon-cog settings"  title="Settings Menu"></div>',			
			'<div class="ps_icon ps-icon-users users"  title="Availible Users Online"></div>',
			//'<img src="'+chrome.extension.getURL("/images/page_swarm_users_icon.png")+'" width="30"/>',

		'</div>',
			'<div class="ps_url">{{url}}</div>',	

		'<div class="bottom_header">',
			'<div class="ps-icon-info terms_of_use"><div class="terms"><div class="terms_scroller">',

				//The tomato was introduced to cultivation in the Middle East by John Barker, British consul in Aleppo circa 1799 to 1825. Nineteenth century descriptions of its consumption are uniformly as an ingredient in a cooked dish. In 1881, it is described as only eaten in the region "within the last forty years". Today, the tomato is a critical and ubiquitous part of Middle Eastern cuisine, served fresh in salads (e.g. Arab salad, Israeli salad, Shirazi salad and Turkish salad), grilled with kebabs and other dishes, made into sauces, and so on.</p><p>Tomatoes were not grown in England until the 1590s. One of the earliest cultivators was John Gerard, a barber-surgeon. Gerard\'s Herbal, published in 1597, and largely plagiarized from continental sources, is also one of the earliest discussions of the tomato in England. Gerard knew the tomato was eaten in Spain and Italy. Nonetheless, he believed it was poisonous (in fact, the plant and raw fruit do have low levels of tomatine, but are not generally dangerous; see below). Gerard\'s views were influential, and the tomato was considered unfit for eating (though not necessarily poisonous) for many years in Britain and its North American colonies. By the mid-18th century, tomatoes were widely eaten in Britain, and before the end of that century, the Encyclopædia Britannica stated the tomato was "in daily use" in soups, broths, and as a garnish. They were not part of the average man\'s diet, however, and though by 1820 they were described as "to be seen in great abundance in all our vegetable markets" and to be "used by all our best cooks", reference was made to their cultivation in gardens still "for the singularity of their appearance", while their use in cooking was associated with Italian or Jewish cuisine.'
				//'<h2>Terms Of Use</h2><p>Please read these Terms of Use (the "Agreement" or "Terms of Use") carefully before using the services offered by PageSwarm, Inc. or PageSwarm London Limited (together “PageSwarm” or the “Company”). This Agreement sets forth the legally binding terms and conditions for your use of the website at www.PageSwarm.com, all other sites owned and operated by PageSwarm that redirect to www.PageSwarm.com, and all subdomains (collectively, the “Site”), and the service owned and operated by the Company (together with the Site, the “Service”). By using the Service in any manner, including, but not limited to, visiting or browsing the Site or contributing content, information, or other materials or services to the Site, you agree to be bound by this Agreement.</p><h2>Summary of Service</h2><p>PageSwarm is a platform where certain users ("Project Creators") run campaigns to fund creative projects by offering rewards to raise money from other users (“Backers”). Through the Site, email, websites, and other media, the Service makes accessible various content, including, but not limited to, videos, photographs, images, artwork, graphics, audio clips, comments, data, text, software, scripts, projects, other material and information, and associated trademarks and copyrightable works (collectively, “Content”). Project Creators, Backers, and other visitors to and users of the Service (collectively, “Users”) may have the ability to contribute, add, create, upload, submit, distribute, facilitate the distribution of, collect, post, or otherwise make accessible ("Submit") Content. “User Submissions” means any Content Submitted by Users.</p><h2>Acceptance of Terms</h2><p>The Service is offered subject to acceptance of all of the terms and conditions contained in these Terms of Use, including the Privacy Policy available at https://www.PageSwarm.com/privacy, and all other operating rules, policies, and procedures that may be published on the Site by the Company, which are incorporated by reference. These Terms of Use apply to every user of the Service. In addition, some services offered through the Service may be subject to additional terms and conditions adopted by the Company. Your use of those services is subject to those additional terms and conditions, which are incorporated into these Terms of Use by this reference.</p><p>The Company reserves the right, at its sole discretion, to modify or replace these Terms of Use by posting the updated terms on the Site. It is your responsibility to check the Terms of Use periodically for changes. Your continued use of the Service following the posting of any changes to the Terms of Use constitutes acceptance of those changes.</p><p>The Company reserves the right to change, suspend, or discontinue the Service (including, but not limited to, the availability of any feature, database, or Content) at any time for any reason. The Company may also impose limits on certain features and services or restrict your access to parts or all of the Service without notice or liability.</p><p>The Service is available only to individuals who are at least 18 years old (and at least the legal age in your jurisdiction). You represent and warrant that if you are an individual, you are at least 18 years old and of legal age in your jurisdiction to form a binding contract, and that all registration information you submit is accurate and truthful. The Company reserves the right to ask for proof of age from you and your account may be suspended until satisfactory proof of age is provided. The Company may, in its sole discretion, refuse to offer the Service to any person or entity and change its eligibility criteria at any time. This provision is void where prohibited by law and the right to access the Service is revoked in those jurisdictions.</p>',
				
				'<h2>Privacy Policy</h2>',
				"<p>This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.</p><p><strong>What personal information do we collect from the people that visit our blog, website or app?</strong></p><p>When ordering or registering on our site, as appropriate, you may be asked to enter your name or other details to help you with your experience.</p><p><strong>When do we collect information?</strong></p><p>We collect information from you when you when user enters the discussion or enter information on our site.</p><p><strong>How do we use your information?</strong></p><p>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:</p><p>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.</p><p><strong>How do we protect visitor information?</strong></p><p>We do not use vulnerability scanning and/or scanning to PCI standards.</p><p>Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p><p>We implement a variety of security measures enters, submits, or accesses their information to maintain the safety of your personal information.</p><p><strong>Do we use 'cookies'?</strong></p><p>Yes. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information. For instance, we use cookies to help us remember and process the items in your shopping cart. They are also used to help us understand your preferences based on previous or current site activity, which enables us to provide you with improved services. We also use cookies to help us compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.</p><p>We use cookies to:<br/> Understand and save user's preferences for future visits. Compile aggregate data about site traffic and site interactions in order to offer better site experiences and tools in the future. We may also use trusted third party services that track this information on our behalf.</p><p>You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser (like Internet Explorer) settings. Each browser is a little different, so look at your browser's Help menu to learn the correct way to modify your cookies.</p><p>If you disable cookies off, some features will be disabled It won't affect the users experience that make your site experience more efficient and some of our services will not function properly.</p><h2>Third Party Disclosure</h2><p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information.</p><h2>Third party links</h2><p>We do not include or offer third party products or services on our website.</p><p><strong>Google</strong></p><p>Google's advertising requirements can be summed up by Google's Advertising Principles. They are put in place to provide a positive experience for users. https://support.google.com/adwordspolicy/answer/1316548?hl=en</p><p>We have not enabled Google AdSense on our site but we may do so in the future.</p><p><strong>California Online Privacy Protection Act</strong></p><p>CalOPPA is the first state law in the nation to require commercial websites and online services to post a privacy policy. The law's reach stretches well beyond California to require a person or company in the United States (and conceivably the world) that operates websites collecting personally identifiable information from California consumers to post a conspicuous privacy policy on its website stating exactly the information being collected and those individuals with whom it is being shared, and to comply with this policy. - See more at: http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf</p><p><strong>According to CalOPPA we agree to the following:</strong><br>Users can visit our site anonymously Once this privacy policy is created, we will add a link to it on our home page, or as a minimum on the first significant page after entering our website. Our Privacy Policy link includes the word 'Privacy', and can be easily be found on the page specified above.</p><p>Users will be notified of any privacy policy changes: On our Privacy Policy Page</p><p>Users are able to change their personal information: By logging in to their account</p><p><strong>How does our site handle do not track signals?</strong></p><p>We honor do not track signals and do not track, plant cookies, or use advertising when a Do Not Track (DNT) browser mechanism is in place.</p><p><strong>Does our site allow third party behavioral tracking?</strong></p><p>It's also important to note that we allow third party behavioral tracking</p><p><strong>COPPA (Children Online Privacy Protection Act)</strong></p><p>When it comes to the collection of personal information from children under 13, the Children's Online Privacy Protection Act (COPPA) puts parents in control. The Federal Trade Commission, the nation's consumer protection agency, enforces the COPPA Rule, which spells out what operators of websites and online services must do to protect children's privacy and safety online.</p><p>We do not specifically market to children under 13.</p><p><strong>Fair Information Practices</strong></p><p>The Fair Information Practices Principles form the backbone of privacy law in the United States and the concepts they include have played a significant role in the development of data protection laws around the globe. Understanding the Fair Information Practice Principles and how they should be implemented is critical to comply with the various privacy laws that protect personal information.</p><p>In order to be in line with Fair Information Practices we will take the following responsive action, should a data breach occur: We will notify the users via in site notification within 1 business day</p><p>We also agree to the individual redress principle, which requires that individuals have a right to pursue legally enforceable rights against data collectors and processors who fail to adhere to the law. This principle requires not only that individuals have enforceable rights against data users, but also that individuals have recourse to courts or a government agency to investigate and/or prosecute non-compliance by data processors.</p><h2>Contacting Us</h2><p>If there are any questions regarding this privacy policy you may contact us using the information below.</p><p>app.pageswarm.com<br>rbutler@ethamatics.com<br>Fort Lauderdale<br>US<br><br>Last Edited on 2014-09-21</p>",
				
			'</p></div></div></div>',
			'<div class="connections"><div class="connection_count"></div><div class="connections_txt">connections...  beta 1.0.1.8</div></div>',
		'</div>'

];
ich.addTemplate('headerBar', headerBar.join(''));

var usernameForm = [
	'<div class="usernameForm">',
		'<p>Enter your Nickname</p>',
		'<div class="form">',
			'<div class="join_btn">Join Page</div>',
			'<div class="username_holder"><input class="username" type="text" /></div>',			
		'</div>',				

		'<div class="avatar_holder">',
			
			'<div class="avatar_header">',
				'<p class="avatar_select_header">Select an Avatar<br/><span class="random_avatar">Random</span></p>',
				'<div class="avatar_select_display"></div>',
			'</div>',

			'<div class="avatars">',
				'<ul class="avatar_list">',
					'{{#avatar_list}}',
						'{{#avatar}}<li id="{{id}}" avatar_link="{{avatar}}"><img width="40" src="http://avatars.pageswarm.com/{{avatar}}" /></li>{{/avatar}}',
						'{{#folder}}<li id="{{folder}}" class="folder"><img width="40" src="http://avatars.pageswarm.com/{{folder_image}}" /><span class="ps-icon-archive archive_icon"></span></li>{{/folder}}',
					'{{/avatar_list}}',
					'<span class="avatar_list_spacer"></space>',				
				'</ul>',
			'</div>',			
		'</div>',
	'</div>',	
];

ich.addTemplate('usernameForm', usernameForm.join(''));

var chatArea = [
	'<div class="chatarea">',	
		'<div class="chat_wrapper">',												
			'<div class="message">',

				'<textarea rows="4" id="swarm_chat" class="data"></textarea>',
	
				//'<div class="data" contenteditable="true"></div>',

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
						//'<img src="http://icons.pageswarm.com/Heart.png" class="facecon icon-Heart"  />',								
						'<img src="http://icons.pageswarm.com/HeartEyes.png"   class="facecon icon-HeartEyes"  />',
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
		'<div class="message_avatar"><img width="40" src="http://avatars.pageswarm.com/{{avatar}}" /></div>',
		'<p class="message_data"><span class="username">{{username}}</span><span class="date">{{date}}</span><span class="message_d">{{{message}}}</span></p>',
	'</div>'
];

ich.addTemplate('messagePostLeft', messagePostLeft.join(''));

var messagePostRight = [
	'<div id="{{id}}" class="message_post right">', 
		'<div class="message_avatar"><img width="40" src="http://avatars.pageswarm.com/{{avatar}}" /></div>',
		'<p class="message_data"><span class="username">{{username}}</span><span class="date">{{date}}</span><span class="message_d">{{{message}}}</span></p>',
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


