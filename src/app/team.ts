import { Pokemon } from './pokemon';

export class Team {
	id: number;
	team: string;
	usage_count: number;
	win_count: number;
	battle_ids: string[];
	users: string[];
	usage_ratio: number;
	win_ratio: number;
	relevance: number;
	pokemon_ids: string[];
	data: any[];
}