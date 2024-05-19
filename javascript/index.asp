<?xml version="1.0" encoding="UTF-8"?>
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="it" lang="it">
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<link rel="stylesheet" type="text/css" href="style/bootstrap.min.css" />
	<link rel="stylesheet" href="style/style.css" type="text/css" />
	<link rel="stylesheet" type="text/css" href="style/custom.css" />
	<link rel="stylesheet" type="text/css" href="style/ionicons.min.css" />
	<link rel="stylesheet" type="text/css" href="style/font-awesome.min.css" />
	<meta name="HandheldFriendly" content="true" />
	<meta name="format-detection" content="telephone=no" />
	<meta name="viewport" content="width=device-width, user-scalable=1, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
	<script type="text/javascript" src="js/main.js"></script>
	
	<meta name="author" content="Mauro Pucci" />
	<meta name="Copyright" content="Mauro Pucci 2024" />
	<meta name="description" content="Test api in javascript" />
	<meta name="title" content="Test api in javascript">
	<title>Test api in javascript</title>
	</head>
	
	<body id="body" style="background: linear-gradient(to right, rgba(0,0,0, 0.7), rgba(0,0,0, 0.7)) fixed; background-size: cover; background-position: center; background-color:#000000;" onload="loadBeers('', '', 1);">
		<header id="header">
			<nav class="navbar navbar-default navbar-fixed-top menu">
				<div class="container">					
					<div class="navbar-headerlogin">
						<a class="navbar-brand" style="float:left; padding-top:5px" href="#">
							<img src="images/logo.png" alt="Beers" title="Beers" />
						</a>
						
					</div>
					<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul class="nav navbar-nav navbar-left main-menu">
							<li class="dropdown"><a class="active" href="#">Home</a></li>
							<li class="dropdown"><a href="#" class="">Soria</a></li>
							<li class="dropdown"><a href="#" class="">Galleria<span></span></a></li>
							<li class="dropdown"><a href="#" class="">Contatti<span></span></a></li>
						</ul>
						
					</div>
				</div>
				<div id="SubMenuMobile">
					<div class="SubMenuMobileSection"><a href="#"><i class="iconMenuactive ion-beer" title="Home"></i></a></div>
					<div class="SubMenuMobileSection"><a href="#"><i class="iconMenu ion-calendar" title="Storia"></i></a></div>
					<div class="SubMenuMobileSection"><a href="#"><i class="iconMenu ion-images" title="Galleria"></i></a></div>
					<div class="SubMenuMobileSection"><a href="#"><i class="iconMenu ion-email" title="Contatti"></i></a></div>
				</div>
			</nav>
		</header>
		
		
		<div id="lp-register">
			<div class="container wrapper">
				<div class="row">
					<div class="col-sm-5">
						<div class="intro-texts">
							<h1 class="text-white">Scopri il mondo della birra!</h1>
							<p>Beer &egrave; la piattaforma che fa al caso tuo, sia che tu sia un amotore della birra, sia nel caso tu sia un fornitre! Offriamo le migliori maarche di birra disponibili sul mercato!<br /> <br />Cosa aspetti? Registrati!</p>
							<button class="btn btn-primary" onclick="document.location.href='#';">Scopri di pi&ugrave;</button>
						</div>
					</div>
					<div class="col-sm-6 col-sm-offset-1">
						<div class="reg-form-container"> 
							<div class="reg-options">
								<ul class="nav nav-tabs">
									<li><a href="#">Registrati</a></li>
									<li class="active"><a href="#">Accedi</a></li>
								</ul>
							</div>

							<div class="tab-content">
								<div class="tab-pane active">
									<h3>Login</h3>
									<p class="text-muted">Accedi al tuo Account!</p>
									
									<div name="MessageBoard" id="MessageBoard" class="errors"></div>
									
									
									<!--<form name="Login_form" id='Login_form'>-->
									<form id="autenticazione" method="post" action="" >
										<input type="hidden" name="subLogin" id="subLogin" value="" />
										<div class="row">
											<div id="frm_login" class="form-group col-xs-12">
												<label for="login" class="sr-only">Username</label>
												<input type="text" name="login" id="login" class="form-control input-group-lg" placeholder="Username" />
											</div>
										</div>
										<div class="row">
											<div id="frm_password" class="form-group col-xs-12">
												<label for="password" class="sr-only">Password</label>
												<input type="password" name="password" id="password" class="form-control col-xs-12 input-group-lg" placeholder="Password"/>
											</div>
										</div>
									</form>
									<p><a href="#">Hai dimenticato la tua password? </a></p>
									<button class="btn btn-primary" onclick="getCheck();">Accedi ora</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		
	
		<div id="main_site" class="container" style="display:none;">
			<div id="page-contents">
				<div class="row">
					<div name="MessageBoard" id="MessageBoard" class="errors"></div>
						
					<div class="col-md-3">
						<h1 class="grey"><em class="ion-search icon-in-title" style="margin-right: 15px; color: #2b2e76;"></em>
							Cerca Birre
						</h1>
						<div class="line"></div>
						
						<form id="registrazione" name="registrazione" method="post">
							<input type="hidden" name="Search" id="Search" value="1" />
							<input type="hidden" name="comando" id="comando" value="" />
							<input type="hidden" name="Inizio" id="Inizio" value="1" />
							<input type="hidden" name="Ordinamento" id="Ordinamento" value="Popolarita" />
							<input type="hidden" name="Orientamento" id="Orientamento" value="Desc" />
				
							<div class="row">
								<div id="frm_IdCitta" class="form-group col-xs-12">
									<label for="IdCitta" class="sr-only"></label>
									<div id="sel_IdCitta">
										<select name="IdCitta" id="IdCitta" class="form-control">
											<option value="">Citt&agrave;</option>
											<option value="Arizona">Arizona</option>
											<option value="California">California</option>
											<option value="Colorado">Colorado</option>
											<option value="Delaware">Delaware</option>
											<option value="Idaho">Idaho</option>
											<option value="Iowa">Iowa</option>
											<option value="Illinois">Illinois</option>
											<option value="Indiana">Indiana</option>
											<option value="Laois">Laois</option>
											<option value="Maryland">Maryland</option>
											<option value="Massachusetts">Massachusetts</option>
											<option value="Michigan">Michigan</option>
											<option value="New York">New York</option>
											<option value="North Carolina">North Carolina</option>
											<option value="Minnesota">Minnesota</option>
											<option value="Mississippi">Mississippi</option>
											<option value="Nevada">Nevada</option>
											<option value="Ohio">Ohio</option>
											<option value="Oklahoma">Oklahoma</option>
											<option value="Oregon">Oregon</option>
											<option value="Pennsylvania">Pennsylvania</option>
											<option value="South Carolina">South Carolina</option>
											<option value="Texas">Texas</option>
											<option value="Vermont">Vermont</option>
											<option value="Virginia">Virginia</option>
											<option value="Washington">Washington</option>
											<option value="Wisconsin">Wisconsin</option>
										</select>
									</div>
								</div>
							</div>
							
							<div class="row">
								<div id="frm_IdMarca" class="form-group col-xs-12">
									<label for="IdMarca" class="sr-only"></label>
									<div id="sel_IdMarca">
										<select name="IdMarca" id="IdMarca" class="form-control">
											<option value="">Marca</option>
											<option value="Barrel">Barrel</option>
											<option value="Brewing">Brewing</option>
											<option value="Brewery">Brewery</option>
											<option value="Cannon">Cannon</option>
											<option value="Torr">Torr</option>
										</select>
									</div>
								</div>
							</div>
							
							<div class="row">
								<div id="frm_IdRecords" class="form-group col-xs-12">
									<label for="IdRecords" class="sr-only"></label>
									<div id="sel_IdRecords">
										<select name="IdRecords" id="IdRecords" class="form-control">
											<option value="9">Birre per pagina</option>
											<option value="9">9</option>
											<option value="18">18</option>
											<option value="45">45</option>
											<option value="90">90</option>
										</select>
									</div>
								</div>
							</div>
							<p align="right"><input type="button" class="btn btn-primary" value="Cerca" onclick="RicercaBirre(1);" /></p>
						</form>
					</div>
					
					
					<div class="col-md-7">
						<div class="edit-profile-container">
							<div class="edit-block">
								<div class="about-content-block">
									<div class="about-content-block">
										
										<div class="about-content-block" align="center">
											<h1 class="grey">Ultime news dal nostro sito</h1>
										</div>
							
										<div class="friend-list">
											<div class="row">
												<div class="col-md-12 col-sm-12">
													<a href="#">
														<div class="timeline-cover3">
															<img src="images/Beers_Front_Page.png" alt="" class="img-responsive cover" />
														</div>
													</a>
													<div class="roundcard6 anncasting">
														<img src="images/logo.png" alt="Beers" class="roundcard6ImgW"/>
													</div>
													<div class="friend-info" style="margin-top:15px; margin-bottom:40px;">
														<span class="text-muted"><i class="icon ion-cash"></i> 
															Le nostre birre sempre fresche
														</span>
														<span style="float:right;"><span class="dataevento"><i class="icon ion-calendar"></i>16/05/2024 08:32</span></span>
														
												
														<div class="line-divider"></div>
													</div>
												</div>
					
											</div>
										</div>
				
				
										<h4 class="grey">
											Birre disponibili
										</h4>
										<div class="line"></div>
									
				
				
				
										<div class="row">
											<ul id="beer_list" class="album-photos">
												
													<li><div class="img-wrapper-model" style="height:0px;"></div></li><li><div class="img-wrapper-model" style="height:0px;"></div></li><li><div class="img-wrapper-model" style="height:0px;"></div></li><li><div class="img-wrapper-model" style="height:0px;"></div></li>
											</ul>
										</div>
				
										
										<div align="right">
											<ul id="beerListPagination" class="pagination pagination-sm">
												
											</ul>
										</div>
										
										
									</div>
								</div>
							</div>
						</div>
					</div>

						
					<div class="col-md-2">
						<div class="suggestions" id="sticky-sidebar">
							<h4 class="grey">Le pi&ugrave; bevute!</h4>
							<div class="row">
								<ul id="mostDrink" class="album-photos"></ul>
							</div>
						</div>
					</div>				
				</div>
			</div>
		</div>
	
		<footer id="footer">
			<div class="container">
				<div class="row">
					<div class="footer-wrapper">
						<div class="col-md-3 col-sm-3">
							<img src="images/logo.png" class="footer-logo" alt="Beer Logo" title="Beer Logo" />
							<ul class="list-inline social-icons">
								<li><a class="nounderline" href="#" target="_blank" rel="nofollow" title="Seguici su Facebook"><i class="icon16 ion-social-facebook"></i></a></li>
								<li><a class="nounderline" href="#" target="_blank" rel="nofollow" title="Seguici su Instagram"><i class="icon16 ion-social-instagram"></i></a></li>
								<li><a class="nounderline" href="#" target="_blank" rel="nofollow" title="Seguici su X"><i class="icon16 ion-social-twitter"></i></a></li>
							</ul>
						</div>
						<div class="col-md-2 col-sm-2">
							<h5>Per i clienti</h5>
							<ul class="footer-links">
								<li><a href="#">Account</a></li>
								<li><a href="#">Come funziona</a></li>
								<li><a href="#">Uso del servizio</a></li>
								<li><a href="#">Le migliori birre</a></li>
								<li><a href="#">Le nostre marche</a></li>
							</ul>
						</div>
						<div class="col-md-2 col-sm-2">
							<h5>Per i fornitori</h5>
							<ul class="footer-links">
								<li><a href="#">Account</a></li>
								<li><a href="#">Proponi una birra</a></li>
								<li><a href="#">Il tuo marchio</a></li>
								<li><a href="#">Beers per le aziende</a></li>
							</ul>
						</div>
						<div class="col-md-2 col-sm-2">
							<h5>Beer</h5>
							<ul class="footer-links">
								<li><a href="#">Chi Siamo</a></li>
								<li><a href="#">Privacy e Cookie</a></li>
								<li><a href="#">Note Legali</a></li>
								<li><a href="#">Sicurezza</a></li>
							</ul>
						</div>
						<div class="col-md-3 col-sm-3">
							<h5>Contattaci</h5>
							<ul class="footer-links">
								<li><a onclick="MandaMail();">Contattaci</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="copyright">
				<p>Beer © 2024.  Tutti i diritti riservati.</p>
			</div>
		</footer>

		<div id="contenitorevideo" class="contvideonascosto">
			<div id="cont_barra_alta" class="cont_barra_alta">
				<div class="box-title">
					<div style="float:left; width:15px;">&nbsp;</div>
					<div id="spostadivchatvideo"></div>
					<div style="float:right; margin-right:5px;" onclick="chiudi_finestra_esajob();"><i class="icon ion-close-round icon"></i></div>
				</div>
				<div id="mostravideochat" class="chatmostravideo"></div>
				<div class="box-title">&nbsp;</div>
			</div>
		</div>
		
		<div id="contenitorevideo2" class="contvideonascosto2">
			<div id="cont_barra_alta" class="cont_barra_alta">
				<div class="box-title">
					<div style="float:left; width:15px;">&nbsp;</div>
					<div id="spostadivchatvideo"></div>
					<div style="float:right; margin-right:5px;" onclick="chiudi_finestra_esajob2();"><i class="icon ion-close-round icon"></i></div>
				</div>
				<div id="mostravideochat2" class="chatmostravideo2"></div>
				<div class="box-title">&nbsp;</div>
			</div>
		</div>
	</body>
</html>