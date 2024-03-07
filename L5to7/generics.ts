function simpleState<T>(initial: T): [() => T, (v: T) => void] {
  let val: T = initial;

  return [
    () => val,
    (v: T) => {
      val = v;
    },
  ];
}

const [state1Getter, state1Setter] = simpleState(10);

console.log(state1Getter());
state1Setter(15);
console.log(state1Getter());

const [state2Getter, state2Setter] = simpleState<string | null>(null); // the <> overrides the assumed type (null)

console.log(state2Getter());
state2Setter("str");
console.log(state2Getter());

function ranker<RankItem>(
  items: RankItem[],
  rank: (v: RankItem) => number
): RankItem[] {
  interface Rank {
    item: RankItem;
    rank: number;
  }

  const ranks: Rank[] = items.map((item) => ({
    item,
    rank: rank(item),
  }));

  ranks.sort((a, b) => a.rank - b.rank);

  return ranks.map((rank) => rank.item);
}

interface Rank<RankItem> {
  item: RankItem;
  rank: number;
}

function rankerInterfaceOutOfFunc<RankItem>(
  items: RankItem[],
  rank: (v: RankItem) => number
): RankItem[] {
  const ranks: Rank<RankItem>[] = items.map((item) => ({
    item,
    rank: rank(item),
  }));

  ranks.sort((a, b) => a.rank - b.rank);

  return ranks.map((rank) => rank.item);
}

interface Pokemon {
  name: string;
  hp: number;
}

const pokemon: Pokemon[] = [
  {
    name: "pok1",
    hp: 20,
  },
  {
    name: "pok2",
    hp: 5,
  },
];

const pokemonRanked = ranker(pokemon, ({ hp }) => hp);
console.log(pokemonRanked);

const pokemonRanked2 = rankerInterfaceOutOfFunc(pokemon, ({ hp }) => hp);
console.log(pokemonRanked2);
