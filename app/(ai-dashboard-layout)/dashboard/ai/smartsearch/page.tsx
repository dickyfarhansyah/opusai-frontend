import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardAISmartsearchPage() {
	return (
		<div className="flex flex-col px-4 py-2">
			<div className="rounded-lg border w-full h-full gap-2 p-4">
				<Tabs defaultValue="overview" className="w-full">
					<TabsList variant={"line"}>
						<TabsTrigger value="overview">All Schemas</TabsTrigger>
						<TabsTrigger value="analytics">Create New</TabsTrigger>
						<TabsTrigger value="reports">Reports</TabsTrigger>
						<TabsTrigger value="settings">Settings</TabsTrigger>
					</TabsList>
					<TabsContent value="overview">
						<Card>
							<CardHeader>
								<CardTitle>Overview</CardTitle>
								<CardDescription>
									View your key metrics and recent project activity. Track
									progress across all your active projects.
								</CardDescription>
							</CardHeader>
							<CardContent className="text-muted-foreground text-sm">
								You have 12 active projects and 3 pending tasks.
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="analytics">
						<Card>
							<CardHeader>
								<CardTitle>Analytics</CardTitle>
								<CardDescription>
									Track performance and user engagement metrics. Monitor trends
									and identify growth opportunities.
								</CardDescription>
							</CardHeader>
							<CardContent className="text-muted-foreground text-sm">
								Page views are up 25% compared to last month.
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="reports">
						<Card>
							<CardHeader>
								<CardTitle>Reports</CardTitle>
								<CardDescription>
									Generate and download your detailed reports. Export data in
									multiple formats for analysis.
								</CardDescription>
							</CardHeader>
							<CardContent className="text-muted-foreground text-sm">
								You have 5 reports ready and available to export.
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="settings">
						<Card>
							<CardHeader>
								<CardTitle>Settings</CardTitle>
								<CardDescription>
									Manage your account preferences and options. Customize your
									experience to fit your needs.
								</CardDescription>
							</CardHeader>
							<CardContent className="text-muted-foreground text-sm">
								Configure notifications, security, and themes.
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
