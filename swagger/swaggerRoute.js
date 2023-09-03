const express = require("express");
const router = express.Router();



var swaggerUi = require("swagger-ui-express"),
  swaggerDocUser = require("./swagger_user.json"),
  swaggerDocCategory = require("./swagger_category.json"),
  swaggerDocComment= require("./swagger_comment.json"),
  swaggerDocPost = require("./swagger_post.json"),
  swaggerDocNotification = require("./swagger_notification.json")



router.get("/", (_, res) => {
  res.sendFile("./swagger.html", { root: __dirname });
});



  router.use("/user",
  swaggerUi.serveFiles(swaggerDocUser),
  swaggerUi.setup(swaggerDocUser)
  );
  router.use("/category",
  swaggerUi.serveFiles(swaggerDocCategory),
  swaggerUi.setup(swaggerDocCategory)
  );
  router.use("/comment",
  swaggerUi.serveFiles(swaggerDocComment),
  swaggerUi.setup(swaggerDocComment)
  );
  router.use("/post",
  swaggerUi.serveFiles(swaggerDocPost),
  swaggerUi.setup(swaggerDocPost)
  );

  router.use("/notification",
  swaggerUi.serveFiles(swaggerDocNotification),
  swaggerUi.setup(swaggerDocNotification)
  )



module.exports = router;
