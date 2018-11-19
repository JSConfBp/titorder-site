import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Steps from '../components/steps'

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	paper: theme.mixins.gutters({
		width: '80vw',
		paddingTop: 16,
		paddingBottom: 16,
		margin: '0 auto',
		marginTop: theme.spacing.unit * 5,
		marginBottom: theme.spacing.unit * 5,
	}),
	title: {
		marginBottom: theme.spacing.unit * 3,
	}
});

const Index = class extends React.Component {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent }
  }

  render() {
	const { classes } = this.props;

    return (
		<div className={classes.root}>


			<div className={classes.paper}>
				<Typography className={classes.title} variant="headline" component="h3">
					Normalize your Tito Order Export
				</Typography>
				<Typography component="p">
					This script will take your Tito Orders export CSV and group bought tickets into s single cell for every order
				</Typography>

				<Steps />
			</div>
		</div>
    )
  }
}

export default withStyles(styles)(Index)