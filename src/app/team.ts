import { Pokemon } from './pokemon';

export class Team {
	id: number;
	team: string;
	usage_count: number;
	win_count: number;
	battle_ids;
	users: string[];
	users_ratio: number;
	usage_ratio: number;
	win_ratio: number;
	relevance: number;
	pokemon_ids: string[];
	ladder_rank: number;
	data: any[];
	show_actions: boolean = false;
}