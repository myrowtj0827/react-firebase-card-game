export interface Card {
    id: string
}

export interface Player {
    name: string
    numberOfTricks: number
    numberOfReplacedCards: number
    boardCard: Card
    remainders: Card[]
    replaces: Card[]
    leaved: boolean
    focused: boolean //
    roundStarter: boolean
}

export interface Room {
    id: string
    title: string
    justJoinedPlayer: string // to enforce security, to notify when player joined
    numberOfPlayers: number
    status: string // indicates current state of room (waiting or replace or playing)
    active: boolean // indicates alive
    decks: Card[]
    replacedCount: number
    playedCount: number
    singleReplaceCardVisible: boolean,
    victoryCards: Card[]
    singleReplaceCardResult: {
        name: string,
        mode: number, // 0: keep, 1: take shown card, 2: take card on deck,
    },
    players: Player[]
    scoreData: [],
}

export const sampleRoomData = {
    title: 'card game',
    status: 'waiting',
    justJoinedPlayer: 'jack',
    active: true,
    decks: [],
    replacedCount: 5,
    playedCount: 5,
    numberOfPlayers: 4,
    singleReplaceCardVisible: false,
    singleReplaceCardResult: {
        name: 'jack',
        mode: 0, // 0: keep, 1: take shown card, 2: take card on deck,
    },
    players: [
        {
            name: 'jack',
            numberOfTricks: 0,
            numberOfReplacedCards: 0,
            boardCard: {
                id: 1,
            },
            remainders: [
                {
                    id: 2,
                },
                {
                    id: 4,
                },
                {
                    id: 8,
                }
            ],
            replaces: {

            },
            focused: false,
            leaved: false,
            roundStarter: true,
        }
    ],
    scoreData: [
        {'0': 1, '1': 1, '2': 2, '3': 3}
    ]
};
