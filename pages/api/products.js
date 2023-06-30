
export default async function handler(req, res) {
	
const PRODUCTS = [
{   Category: "Nabiał",    Price: 4,    Name: "mleko",    },
{   Category: "Nabiał",    Price: 6,    Name: "masło",    },
{   Category: "Nabiał",    Price: 3,    Name: "jogurt",    },
{   Category: "Pieczywo",    Price: 1,    Name: "bułka",    },
{   Category: "Pieczywo",    Price: 4,    Name: "bagietka",    },
{   Category: "Mięso",    Price: 16,    Name: "kurczak",    }
];




	
  res.status(200).json(PRODUCTS);
}
