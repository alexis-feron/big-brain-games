const { BlackjackStats } = require("@/models/blackjackModel");
const { User } = require("@/models/userModel");
import dbConnect from '@/utils/functions/dbConnect';
export default async function handler(req, resp) {
	
	// Methode PUT
	const { method } = req
	if(method !== 'PUT') resp.status(400).send({ success: false, error: "Erreur lors de l'envoie de la requête, changez de méthode" })

	const body = JSON.parse(req.body)
    if(!body.user) return ({success: false, error: "Veuillez renseigner un utilisateur"});

	// Connexion à la DB
	await dbConnect().catch(err => resp.status(500).send({ success: false, error: "Erreur de connexion avec la base de données" }))

	// Utilisateur inexistant
	const user = await User.findOne({pseudo: body.user});
	if(!user) return resp.status(405).send({ success: false, error: "Cet utilisateur n'existe pas" });

	// Ajout/Création des stats
	const stats = await BlackjackStats.findOne({user: body.user});
	if(!stats){
		await BlackjackStats.create({
			user: body.user, 
			totalGames: body.totalGames,
			totalWins: body.totalWins,
			totalDiceThrownByUser: body.totalDiceThrownByUser,
			total21ByUser: body.total21ByUser,
			totalBustByUser: body.totalBustByUser,
			totalRounds: body.totalRounds,
			totalScore: body.totalScore
		})
	}else{
		await BlackjackStats.updateOne({user: body.user},{
			$inc: {
				totalGames: body.totalGames,
				totalWins: body.totalWins,
				totalDiceThrownByUser: body.totalDiceThrownByUser,
				total21ByUser: body.total21ByUser,
				totalBustByUser: body.totalBustByUser,
				totalRounds: body.totalRounds,
				totalScore: body.totalScore
			}
		})
	}

	
	resp.status(201).send({ success: true })

}
