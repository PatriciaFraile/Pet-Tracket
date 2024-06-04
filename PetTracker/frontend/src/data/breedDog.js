const dogCareInfo = {
    "labrador": {
      "alimentacion": {
        "cachorro": "Un cachorro tiene que comer tres veces al día y consumir 300 gramos de pienso al día",
        "junior": "Un junior tiene que comer pienso dos veces al día, repartidas en gran cantidad de pienso",
        "senior": "Un senior tiene que comer pienso dos veces al día, repartidas en gran cantidad de pienso"
      },
      "cuidados": "Cuando adoptas al labrador, lo primero que tienes que hacer es visitar el veterinario para ver su estado de salud y ponerle las vacunas correspondientes",
      "adiestramiento": "Más sencillo educar a un cachorro, uno de los entrenamientos es enseñarles a cómo se llamar y a socializar con otros perros",
      "ordenes": "Ven, No, Vamos, Sienta, Tumba, Quieto",
      "caracteristicas": "Perros de familia. Su carácter es muy dócil y obediente. Tienen buena disposición para el trabajo. Son perros obedientes. Aprenden con facilidad, lo que reduce los tiempos de respuesta a las indicaciones. Son perros enérgicos."
    },
    "poodle": {
      "alimentacion": {
        "cachorro": "Un cachorro de poodle debe comer tres veces al día con una porción total de 250 gramos de pienso al día",
        "junior": "Un junior debe ser alimentado dos veces al día con 300 gramos de pienso diario",
        "senior": "Un senior debe ser alimentado dos veces al día con 250 gramos de pienso diario"
      },
      "cuidados": "Es importante cepillar regularmente su pelaje para evitar enredos y acudir al veterinario para sus chequeos y vacunas",
      "adiestramiento": "El adiestramiento de un poodle debe incluir comandos básicos y socialización temprana",
      "ordenes": "Ven, No, Vamos, Sienta, Tumba, Quieto",
      "caracteristicas": "Perros inteligentes y activos. Son muy buenos en obediencia y agilidad. Son amigables y se llevan bien con los niños."
    },
    "pastor aleman": {
      "alimentacion": {
        "cachorro": "Un cachorro de pastor alemán necesita comer tres veces al día y consumir 400 gramos de pienso al día",
        "junior": "Un junior debe comer dos veces al día con una cantidad total de 500 gramos de pienso diario",
        "senior": "Un senior debe ser alimentado dos veces al día con 400 gramos de pienso diario"
      },
      "cuidados": "Necesitan ejercicio diario y chequeos veterinarios regulares para mantenerse en buena salud",
      "adiestramiento": "Es crucial empezar el adiestramiento temprano para aprovechar su inteligencia y capacidad de trabajo",
      "ordenes": "Ven, No, Vamos, Sienta, Tumba, Quieto, Busca",
      "caracteristicas": "Perros leales y protectores. Son muy inteligentes y fáciles de entrenar. Excelentes para trabajos de protección y búsqueda."
    },
    "golden": {
      "alimentacion": {
        "cachorro": "Un cachorro de golden retriever debe comer tres veces al día con una porción total de 350 gramos de pienso al día",
        "junior": "Un junior debe ser alimentado dos veces al día con 400 gramos de pienso diario",
        "senior": "Un senior debe ser alimentado dos veces al día con 350 gramos de pienso diario"
      },
      "cuidados": "Cepillado regular para evitar enredos y chequeos veterinarios regulares son necesarios",
      "adiestramiento": "Entrenamiento en obediencia y socialización desde temprana edad",
      "ordenes": "Ven, No, Vamos, Sienta, Tumba, Quieto, Trae",
      "caracteristicas": "Perros amigables y dóciles. Muy buenos con los niños y otros animales. Inteligentes y fáciles de entrenar."
    },
    "frances": {
      "alimentacion": {
        "cachorro": "Un cachorro debe comer tres veces al día con una porción total de 250 gramos de pienso al día",
        "junior": "Un junior debe ser alimentado dos veces al día con 300 gramos de pienso diario",
        "senior": "Un senior debe ser alimentado dos veces al día con 250 gramos de pienso diario"
      },
      "cuidados": "Requieren cuidado especial en sus pliegues faciales y chequeos veterinarios regulares",
      "adiestramiento": "Entrenamiento en obediencia básico y socialización temprana",
      "ordenes": "Ven, No, Vamos, Sienta, Tumba, Quieto",
      "caracteristicas": "Perros amigables y cariñosos. Son buenos compañeros de hogar y se adaptan bien a la vida en apartamento."
    },
    "bulldog ingles": {
      "alimentacion": {
        "cachorro": "Un cachorro de bulldog inglés debe comer tres veces al día con una porción total de 300 gramos de pienso al día",
        "junior": "Un junior debe ser alimentado dos veces al día con 350 gramos de pienso diario",
        "senior": "Un senior debe ser alimentado dos veces al día con 300 gramos de pienso diario"
      },
      "cuidados": "Necesitan cuidado especial en sus pliegues faciales y chequeos veterinarios regulares",
      "adiestramiento": "Entrenamiento en obediencia básico y socialización temprana",
      "ordenes": "Ven, No, Vamos, Sienta, Tumba, Quieto",
      "caracteristicas": "Perros dóciles y amigables. Son buenos compañeros y se adaptan bien a la vida en apartamento."
    },
    "caniche": {
      "alimentacion": {
        "cachorro": "Un cachorro de caniche debe comer tres veces al día con una porción total de 250 gramos de pienso al día",
        "junior": "Un junior debe ser alimentado dos veces al día con 300 gramos de pienso diario",
        "senior": "Un senior debe ser alimentado dos veces al día con 250 gramos de pienso diario"
      },
      "cuidados": "Es importante cepillar regularmente su pelaje para evitar enredos y acudir al veterinario para sus chequeos y vacunas",
      "adiestramiento": "El adiestramiento de un caniche debe incluir comandos básicos y socialización temprana",
      "ordenes": "Ven, No, Vamos, Sienta, Tumba, Quieto",
      "caracteristicas": "Perros inteligentes y activos. Son muy buenos en obediencia y agilidad. Son amigables y se llevan bien con los niños."
    },
    "beagle": {
      "alimentacion": {
        "cachorro": "Un cachorro de beagle debe comer tres veces al día con una porción total de 300 gramos de pienso al día",
        "junior": "Un junior debe ser alimentado dos veces al día con 350 gramos de pienso diario",
        "senior": "Un senior debe ser alimentado dos veces al día con 300 gramos de pienso diario"
      },
      "cuidados": "Requieren ejercicio diario y chequeos veterinarios regulares para mantenerse en buena salud",
      "adiestramiento": "Entrenamiento en obediencia y socialización desde temprana edad",
      "ordenes": "Ven, No, Vamos, Sienta, Tumba, Quieto",
      "caracteristicas": "Perros enérgicos y curiosos. Son excelentes perros de compañía y buenos con los niños."
    },
    "rottweiler": {
      "alimentacion": {
        "cachorro": "Un cachorro de rottweiler debe comer tres veces al día con una porción total de 400 gramos de pienso al día",
        "junior": "Un junior debe ser alimentado dos veces al día con 450 gramos de pienso diario",
        "senior": "Un senior debe ser alimentado dos veces al día con 400 gramos de pienso diario"
      },
      "cuidados": "Necesitan ejercicio regular y chequeos veterinarios frecuentes",
      "adiestramiento": "Entrenamiento en obediencia es crucial desde temprana edad debido a su tamaño y fuerza",
      "ordenes": "Ven, No, Vamos, Sienta, Tumba, Quieto, Guarda",
      "caracteristicas": "Perros leales y protectores. Muy inteligentes y buenos para trabajos de protección."
    },
    "pointer": {
      "alimentacion": {
        "cachorro": "Un cachorro de pointer debe comer tres veces al día con una porción total de 350 gramos de pienso al día",
        "junior": "Un junior debe ser alimentado dos veces al día con 400 gramos de pienso diario",
        "senior": "Un senior debe ser alimentado dos veces al día con 350 gramos de pienso diario"
      },
      "cuidados": "Requieren mucho ejercicio y chequeos veterinarios regulares",
      "adiestramiento": "Entrenamiento en obediencia y socialización desde temprana edad",
      "ordenes": "Ven, No, Vamos, Sienta, Tumba, Quieto",
      "caracteristicas": "Perros enérgicos y buenos cazadores. Son amigables y se llevan bien con los niños."
    },
    "corgi": {
      "alimentacion": {
        "cachorro": "Un cachorro de corgi debe comer tres veces al día con una porción total de 300 gramos de pienso al día",
        "junior": "Un junior debe ser alimentado dos veces al día con 350 gramos de pienso diario",
        "senior": "Un senior debe ser alimentado dos veces al día con 300 gramos de pienso diario"
      },
      "cuidados": "Necesitan ejercicio regular y chequeos veterinarios frecuentes",
      "adiestramiento": "Entrenamiento en obediencia y socialización desde temprana edad",
      "ordenes": "Ven, No, Vamos, Sienta, Tumba, Quieto",
      "caracteristicas": "Perros inteligentes y amigables. Muy buenos con los niños y otros animales."
    },
    "dachshund": {
      "alimentacion": {
        "cachorro": "Un cachorro de dachshund debe comer tres veces al día con una porción total de 250 gramos de pienso al día",
        "junior": "Un junior debe ser alimentado dos veces al día con 300 gramos de pienso diario",
        "senior": "Un senior debe ser alimentado dos veces al día con 250 gramos de pienso diario"
      },
      "cuidados": "Requieren ejercicio moderado y chequeos veterinarios regulares",
      "adiestramiento": "Entrenamiento en obediencia y socialización desde temprana edad",
      "ordenes": "Ven, No, Vamos, Sienta, Tumba, Quieto",
      "caracteristicas": "Perros valientes y enérgicos. Son amigables y buenos con los niños."
    },
    "yorkshire": {
      "alimentacion": {
        "cachorro": "Un cachorro de yorkshire debe comer tres veces al día con una porción total de 200 gramos de pienso al día",
        "junior": "Un junior debe ser alimentado dos veces al día con 250 gramos de pienso diario",
        "senior": "Un senior debe ser alimentado dos veces al día con 200 gramos de pienso diario"
      },
      "cuidados": "Requieren cepillado diario y chequeos veterinarios frecuentes",
      "adiestramiento": "Entrenamiento en obediencia básico y socialización temprana",
      "ordenes": "Ven, No, Vamos, Sienta, Tumba, Quieto",
      "caracteristicas": "Perros valientes y enérgicos. Son amigables y buenos con los niños."
    },
    "husky": {
      "alimentacion": {
        "cachorro": "Un cachorro de husky debe comer tres veces al día con una porción total de 350 gramos de pienso al día",
        "junior": "Un junior debe ser alimentado dos veces al día con 400 gramos de pienso diario",
        "senior": "Un senior debe ser alimentado dos veces al día con 350 gramos de pienso diario"
      },
      "cuidados": "Necesitan mucho ejercicio y chequeos veterinarios frecuentes",
      "adiestramiento": "Entrenamiento en obediencia y socialización desde temprana edad",
      "ordenes": "Ven, No, Vamos, Sienta, Tumba, Quieto, Busca",
      "caracteristicas": "Perros enérgicos y resistentes. Son amigables y buenos con los niños."
    },
    "chihuahua": {
      "alimentacion": {
        "cachorro": "Un cachorro de chihuahua debe comer tres veces al día con una porción total de 150 gramos de pienso al día",
        "junior": "Un junior debe ser alimentado dos veces al día con 200 gramos de pienso diario",
        "senior": "Un senior debe ser alimentado dos veces al día con 150 gramos de pienso diario"
      },
      "cuidados": "Requieren cuidado dental y chequeos veterinarios regulares",
      "adiestramiento": "Entrenamiento en obediencia básico y socialización temprana",
      "ordenes": "Ven, No, Vamos, Sienta, Tumba, Quieto",
      "caracteristicas": "Perros valientes y enérgicos. Son amigables y buenos con los niños."
    }
  };
  
  export default dogCareInfo;