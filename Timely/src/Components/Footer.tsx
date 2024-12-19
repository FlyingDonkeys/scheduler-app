import { Box, Container, Typography, IconButton, Link } from "@mui/material";
import RedditIcon from "@mui/icons-material/Reddit";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";

function Footer() {
    const currentDate = new Date().getFullYear();

    return (
        <Box component="footer" sx={{ backgroundColor: "white", py: 3, mt: 4, borderTop: "1px solid #e0e0e0" }}>
            <Container sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", justifyContent: "space-between", gap: 2 }}>

                {/* Profile Picture */}
                <Link href="https://chunithm.sega.com/" target="_blank" rel="noreferrer noopener">
                    <img
                        src="https://avatars.githubusercontent.com/u/80049074?s=96&v=4"
                        alt="My Profile Picture"
                        style={{ borderRadius: "50%", width: "96px", height: "96px" }}
                    />
                </Link>

                {/* Copyright */}
                <Typography variant="body2" color="textSecondary" align="center">
                    © Copyright {currentDate}. All Rights Reserved.
                </Typography>

                {/* Social Icons */}
                <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="default"
                        aria-label="Reddit"
                    >
                        <RedditIcon />
                    </IconButton>
                    <IconButton
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="default"
                        aria-label="Facebook"
                    >
                        <FacebookIcon />
                    </IconButton>
                    <IconButton
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="default"
                        aria-label="GitHub"
                    >
                        <GitHubIcon />
                    </IconButton>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;
